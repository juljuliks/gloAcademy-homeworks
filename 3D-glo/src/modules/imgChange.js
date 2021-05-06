const imgChange = () => {
    const teamBlock = document.querySelector('.command'),
        images = teamBlock.querySelectorAll('.command__photo');

    images.forEach(img => {
        let defaultImage;
        img.addEventListener('mouseenter', (e) => {
            defaultImage = e.target.src;
            e.target.src = e.target.dataset.img;
        });
        img.addEventListener('mouseleave', (e) => {
            e.target.src = defaultImage;
        });
    })
};

export default imgChange;