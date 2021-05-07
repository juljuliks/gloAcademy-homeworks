const validateInputs = () => {
    const calcInputs = document.querySelectorAll('input.calc-item'),
        formName = document.querySelectorAll('[name=user_name]'),
        formMessage = document.querySelectorAll('[name=user_message]'),
        formEmail = document.querySelectorAll('[name=user_email]'),
        formPhone = document.querySelectorAll('[name=user_phone]');

    const validateNumberInputs = () => {
        calcInputs.forEach(el => {
            el.value = el.value.replace(/[^\d]/g, '');
        })
    };

    const inputsHandler = (e) => {
        if (e.target.matches('.calc-item')) {
            validateNumberInputs();
        }
        if (e.target.matches('[name=user_name]')) {
            e.target.value = e.target.value.replace(/[^а-яё\-\ ]/gi, '');
        }
        if (e.target.matches('#form2-message')) {
            e.target.value = e.target.value.replace(/[^а-яё0-9\.\,\:\-\!\?\ ]/gi, '');
        }
        if (e.target.matches('[name=user_email]')) {
            e.target.value = e.target.value.replace(/[^a-z\@\_\-\.\!\~\*\']/gi, '');
        }
        if (e.target.matches('[name=user_phone]')) {
            e.target.value = e.target.value.replace(/[^\d\(\)\-\+]/g, '');
            if (e.target.value.length > 10) {
                e.target.value = e.target.value.substring(0, 11)
            }
        }
    }

    const trim = (input) => {
        input.value = input.value.replace(/\s+/g, ' ');
        input.value = input.value.replace(/\-+/g, '-');

        let inputToExp = new RegExp("ReGeX" + input.value + "ReGeX");
        if (/^[/ /-]/.test(inputToExp)) {
            input.value = input.value.replace(/^[/ /-]/, '')
        }
        if (/[/ /-]$/.test(inputToExp)) {
            input.value = input.value.replace(/[/ /-]$/, '')
        }
    }

    const capitalize = (input) => {
        let inputValue = input.value
        return inputValue.split(' ').map(item =>
            item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()).join(' ');
    }

    const controlInputs = (input, exp) => {
        if (!input.value.match(exp)) {
            input.value = '';
        } 
    }

    formName.forEach(el => {
        el.addEventListener('blur', () => {
            trim(el);
            el.value = capitalize(el);
            controlInputs(el, /[а-яё]{2,}/gi);
        })
    })

    formMessage.forEach(el => {
        el.addEventListener('blur', () => {
            controlInputs(el, /[а-яё0-9\.\,\:\-\!\?\ ]/gi);
            trim(el);
        })
    })

    formEmail.forEach(el => {
        el.required = true;
        el.addEventListener('blur', () => {
            trim(el);
            controlInputs(el, /\w+@\w+\.\w{2,3}/g);
        })
    })

    formPhone.forEach(el => {
        el.addEventListener('blur', () => {
            trim(el);
            controlInputs(el, /\+?([-()]*\d){7,}/g);
        })
    })

    window.addEventListener('input', inputsHandler);
}
export default validateInputs;