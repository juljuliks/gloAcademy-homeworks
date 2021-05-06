const sendForm = () => {
    const errorMessage = 'Что-то пошло не так',
        succesMessage = 'Спасибо, мы скоро с вами свяжемся!';

    const form1 = document.getElementById('form1'),
        form2 = document.getElementById('form2'),
        form3 = document.getElementById('form3');

    const statusMessage = document.createElement('div');
    const circle = document.createElement('div');
    circle.classList.add('circle');
    statusMessage.style.cssText = 'font-size: 2rem; color: #fff';

    const createRequest = (form) => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            form.appendChild(statusMessage);
            form.appendChild(circle);
            const formData = new FormData(form);
            let body = {};
            formData.forEach((val, key) => {
                body[key] = val;
            })

            fetch('./server.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body) 
                })
                .then((response) => {
                    if (response.status !== 200) {
                        throw new Error('status network not 200')
                    }
                    document.querySelector('.circle').remove();
                    statusMessage.textContent = succesMessage;
                    setTimeout(() => {
                        statusMessage.innerHTML = '';
                        document.querySelector('.popup').style.display = 'none';
                    }, 2000)
                    let formInputs = form.querySelectorAll('input');
                    formInputs.forEach(input => {
                        input.value = input.defaultValue;
                    })
                })
                .catch((error) => {
                    console.error(error)
                    document.querySelector('.circle').remove();
                    statusMessage.textContent = errorMessage;
                    setTimeout(() => {
                        statusMessage.innerHTML = '';
                        document.querySelector('.popup').style.display = 'none';
                    }, 2000)
                })
        });
    }

    createRequest(form1);
    createRequest(form2);
    createRequest(form3);
}

export default sendForm;