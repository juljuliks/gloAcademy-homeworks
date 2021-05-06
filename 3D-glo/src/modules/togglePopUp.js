
const togglePopUp = () => {
    const popUp = document.querySelector('.popup'),
        popupBtn = document.querySelectorAll('.popup-btn'),
        popupContent = document.querySelector('.popup-content');

    let count = 0;
    let animate;

    const animateModal = () => {
        animate = requestAnimationFrame(animateModal)
        count += 3;
        if (count <= 43) {
            popupContent.style.left = count + '%';
            return;
        } else {
            cancelAnimationFrame(animate);
        }
    }

    popupBtn.forEach(el => {
        el.addEventListener('click', () => {
            popUp.style.display = 'block';
            if (screen.width > 768) {
                animate = requestAnimationFrame(animateModal);
                count = 0;
            } else {
                popupContent.style.left = '28%';
                cancelAnimationFrame(animate);
            }
        });
    });

    popUp.addEventListener('click', (event) => {
        let target = event.target;
        if (target.classList.contains('popup-close')) {
            popUp.style.display = 'none';
        } else {
            target = target.closest('.popup-content');
            if (!target) {
                popUp.style.display = 'none';
            }
        }
    })
};

export default togglePopUp;