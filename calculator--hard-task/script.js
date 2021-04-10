let week = ['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресенье'];
let date = new Date();

for (let i = 0, len = week.length; i < len; i++) {
    week[i] = week[i].slice(0,1).toUpperCase().concat(week[i].slice(1));
    let htmlItem = week[i];
    if (i === (date.getDay()-1)) htmlItem = htmlItem.bold(); 
    else if (i > 4) htmlItem = htmlItem.italics(); 

    const div = document.createElement('div');
    div.innerHTML = htmlItem;
    document.body.appendChild(div);
}