const toggleMenu = () => {
    const menu = document.querySelector('menu');

    window.addEventListener('click', (event) => {
        let target = event.target;
        if (target.closest('.menu')) {
            console.log('.menu');
            menu.classList.toggle('active-menu');
        } else if (!target.closest('menu') || target.matches('.close-btn')) {
            menu.classList.remove('active-menu');
        }
    })

};

export default toggleMenu;