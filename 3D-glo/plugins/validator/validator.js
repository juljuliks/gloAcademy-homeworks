class Validator {
    constructor({
        selector,
        pattern = {},
        method
    }) {
        this.form = document.querySelector(selector);
        this.pattern = pattern;
        this.method = method;
        this.elementsForm = [...this.form.elements].filter(item => {
            return item.tagName.toLowerCase() !== 'button' &&
                item.type !== 'button';
        });
        this.errorDiv = document.createElement('div');
        this.error = new Set();
    }

    init() {
        this.applyStyle();
        this.setPattern();
        this.elementsForm.forEach(el => el.addEventListener('change', this.checkIt.bind(this)));
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.elementsForm.forEach(el => this.checkIt({target: el}));
            if (this.error.size) {
                e.preventDefault();
            }
            });
    }

    isValid(elem) {
        const validatorMethod = {
            notEmpty(elem) {
                if (elem.value.trim() === '') {
                    return false;
                }
                return true;
            },
            pattern(elem, pattern) {
                return pattern.test(elem.value)
            }
        };

        if (this.method) {
            const method = this.method[elem.id];
            if (method) {
                return method.every(item => validatorMethod[item[0]](elem, this.pattern[item[1]]))
            }
        } else {
            console.warn('Необходимо передать id полей ввода и методы проверки этих полей')
        }

        return true;
    }

    checkIt(event) {
        const target = event.target;
        if (this.isValid(target)) {
            this.showSuccess(target);
            this.error.delete(target)
        } else {
            this.showError(target);
            this.error.add(target);
        }
    }

    showError(elem) {
        elem.classList.remove('success');
        elem.classList.add('error');
        if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
            return;
        }
        this.errorDiv.textContent = 'Ошибка в этом поле';
        this.errorDiv.classList.add('validator-error');
        let cloneErrorDiv = this.errorDiv.cloneNode(true);
        elem.insertAdjacentElement('afterend', cloneErrorDiv);
    }

    showSuccess(elem) {
        elem.classList.remove('error');
        elem.classList.add('success');
        if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
            elem.nextElementSibling.remove();
        }
    }

    applyStyle() {
        const style = document.createElement('style');
        style.textContent = `
        .success {
            border: 2px solid green;
        }
        .error {
            border: 2px solid red;
        }
        .validator-error {
            font-size: 14px;
            font-family: sans-serif;
            color: red;
        }
        `;
        document.head.appendChild(style)
    }

    setPattern() {
        this.pattern.phone = this.pattern.phone ? this.pattern.phone : /^\+?[78]([-()]*\d){10}$/;
        this.pattern.email = this.pattern.email ? this.pattern.email : /^\w+@\w+\.\w{2,}$/;
        this.pattern.name = this.pattern.name ? this.pattern.name : /^[а-яё]*$/gi;
        this.pattern.message = this.pattern.message ? this.pattern.message : /[а-яё\-\ \,\.\!\?]/gi;
    }
}