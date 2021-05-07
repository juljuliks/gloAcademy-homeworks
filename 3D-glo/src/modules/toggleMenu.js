const toggleMenu = () => {
    const menu = document.querySelector('menu');

    window.addEventListener('click', (event) => {
        let target = event.target;
        if (target.closest('.menu') || target.matches('menu>ul>li>a')) {
            menu.classList.toggle('active-menu');
        } else if (!target.closest('menu') || target.matches('.close-btn')) {
            menu.classList.remove('active-menu');
        }
    })

    menu.querySelector('a.close-btn').addEventListener('click', (e) => {
        e.preventDefault();
    })


};

export default toggleMenu;