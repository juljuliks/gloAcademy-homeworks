const scroll = () => {
    const menu = document.querySelector('menu'),
        menuItems = menu.querySelectorAll('ul>li>a'),
        serviceBlock = document.querySelector('#service-block'),
        portfolio = document.querySelector('#portfolio'),
        calc = document.querySelector('#calc'),
        team = document.querySelector('#command'),
        connect = document.querySelector('#connect'),
        img = document.querySelector('#scrollImg');

    function scrollTo(target) {
        window.scroll({
            left: 0,
            top: target.getBoundingClientRect().top,
            behavior: 'smooth'
        });
    };

    img.addEventListener('click', (e) => {
        e.preventDefault()
        scrollTo(serviceBlock);
    });

    menuItems.forEach((el) => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            const blockId = el.getAttribute('href');
            if (blockId === '#service-block') {
                scrollTo(serviceBlock);
            } else if (blockId === '#portfolio') {
                scrollTo(portfolio);
            } else if (blockId === '#calc') {
                scrollTo(calc);
            } else if (blockId === '#command') {
                scrollTo(team);
            } else if (blockId === '#connect') {
                scrollTo(connect);
            }
        });
    });
};

export default scroll;