function getFullDate() {
    let date = new Date(),
        year = date.getFullYear(),
        month = date.getMonth(),
        dayOfMonth = date.getDate(),
        dayOfWeek = date.getDay(),
        hour = date.getHours(),
        minutes = date.getMinutes(),
        seconds = date.getSeconds();
        
        //
        hourName = `${hour} ${declOfNum(hour, ['час', 'часа', 'часов'])}`;
        minutesName = `${minutes} ${declOfNum(minutes, ['минута', 'минуты', 'минут'])}`;
        secondsName = `${seconds} ${declOfNum(seconds, ['секунда', 'секунды', 'секунд'])}`
        monthName = getMonthName();
        newDayOfWeek = getDaysOfWeekRus();
    
        let string = `Сегодня ${newDayOfWeek}, ${dayOfMonth} ${monthName} ${year} года, ${hourName} ${minutesName} ${secondsName}`;
        checkDivExist();
        renderDate(string);
        
        //
        dayOfMonth = convertNumber(dayOfMonth);
        month = convertNumber(month + 1);
        hour = convertNumber(hour);
        minutes = convertNumber(minutes);
        seconds = convertNumber(seconds);
    
        let secondString = `${dayOfMonth}.${month}.${year} - ${hour}:${minutes}:${seconds}`;
        renderDate(secondString);

    function getDaysOfWeekRus() {
        let dayName;
        let daysOfWeekRus = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресение'];
        daysOfWeekRus.forEach((i) => {
            dayName = daysOfWeekRus[dayOfWeek - 1];
        })
        return dayName;
    }

    function getMonthName() {
        let monthName;
        let month = date.getMonth();
        let monthRus = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

        monthRus.forEach((el) => {
            monthName = monthRus[month];
            if (monthName === 'Март' || monthName === 'Август') {
                monthName = `${monthName}a`;
            } else {
                monthName = `${monthName.substring(0, (el.length - 2))}я`;
            }
        })
        return monthName;
    }

    function declOfNum(number, names) {
        let cases = [2, 0, 1, 1, 1, 2];
        return names[
            (number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]
        ];
    }

    function renderDate(string) {
        let div = document.createElement('div');
        div.innerHTML = string;
        document.body.appendChild(div);
    }

    function checkDivExist() {
        let html = document.querySelectorAll('div');
        console.log(html);
        if (html !== undefined) {
            html.forEach(elem => {
                elem.remove();
            });
        }
    }

    function convertNumber(num) {
        let prefix = '0';
        num = num.toString();
        if (num.length === 1) {
            num = `${prefix}${num}`;
        }
        return num;
    }
}

setInterval(getFullDate, 1000);