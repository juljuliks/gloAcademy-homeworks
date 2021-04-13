const books = document.querySelectorAll('.book'),
    aside = document.querySelector('aside'),
    chaptersBookTwo = books[0].querySelectorAll('li'),
    chaptersBookFive = books[5].querySelectorAll('li'),
    chaptersBookSix = books[2].querySelectorAll('li'),
    newChapterBookSix = document.createElement('li');

console.log(books);
console.log(chaptersBookSix);


document.querySelector('.adv').remove();
document.body.style.backgroundImage = 'url("./image/you-dont-know-js.jpg")';

aside.append(books[1], books[0], books[4], books[3], books[5], books[2]);

chaptersBookTwo[9].after(chaptersBookTwo[2]);
chaptersBookTwo[9].before(chaptersBookTwo[7]);
chaptersBookTwo[8].after(chaptersBookTwo[4]);
chaptersBookTwo[7].before(chaptersBookTwo[5]);

chaptersBookFive[1].after(chaptersBookFive[9]);
chaptersBookFive[6].before(chaptersBookFive[2]);
chaptersBookFive[3].after(chaptersBookFive[4]);
chaptersBookFive[8].before(chaptersBookFive[5]);

books[2].append(newChapterBookSix);
newChapterBookSix.textContent = 'Глава 8: За пределами ES6';

chaptersBookSix[8].after(newChapterBookSix);









