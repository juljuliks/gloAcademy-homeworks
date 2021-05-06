const toggleMenu = () => {
    const btnMenu = document.querySelector('.menu'),
        menu = document.querySelector('menu'),
        closeBtn = document.querySelector('.close-btn'),
        menuItems = menu.querySelectorAll('ul>li');

    window.addEventListener('click', (event) => {
        let target = event.target;
        if (target.closest('.menu') || target.closest('menu')) {
            menu.classList.toggle('active-menu');
        } else if (!target || !target.closest('menu')) {
            menu.classList.remove('active-menu');
        }
    })

};

export default toggleMenu;