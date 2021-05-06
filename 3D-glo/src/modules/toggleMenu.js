const toggleMenu = () => {
    const menu = document.querySelector('menu');

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