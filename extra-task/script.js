function displayDateInfo(deadline) {
    let div = document.querySelector('div'),
        date = new Date();


    function getFullData() {
        let hours = date.getHours(),
            dayOfWeek = date.getDay(),
            minutes = date.getMinutes(),
            seconds = date.getSeconds(),
            dateNow = new Date().getTime(),
            dateStop = new Date(deadline).getTime(),
            daysTillNewYear = Math.floor(((dateStop - dateNow) / 1000) / 60 / 60 / 24);

            return {dayOfWeek, hours, minutes, seconds, daysTillNewYear}
    }


    function createMessage() {
        let fullData = getFullData();

        function createGreeting() {
            let greeting;
            if (fullData.hours > 8 && fullData.hours < 11) {
                greeting = 'Добрoe утро';
            } else if (fullData.hours < 17) {
                greeting = 'Добрый день';
            } else if (fullData.hours < 23) {
                greeting = 'Добрый вечер';
            } else if (fullData.hours > 23 && fullData.hours < 9) {
                greeting = 'Доброй ночи';
            }
            return greeting;
        }

        function getDaysOfWeekRus() {
            let dayName;
            let daysOfWeekRus = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресение'];
            daysOfWeekRus.forEach((i) => {
                dayName = daysOfWeekRus[fullData.dayOfWeek - 1];
            })
            return dayName;
        }

        function addPrefix(num) {
            let prefix = '0';
            num = num.toString();
            if (num.length === 1) {
                num = `${prefix}${num}`;
            }
            return num;
        }

        function declOfNum(number, names) {
            let cases = [2, 0, 1, 1, 1, 2];
            return names[
                (number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]
            ];
        }

        div.innerHTML = `<p>${createGreeting()}</p>
                          <p>Сегодня: ${getDaysOfWeekRus()}</p>
                          <p>Текущее время: ${addPrefix(fullData.hours)}:${addPrefix(fullData.minutes)}:${addPrefix(fullData.seconds)}</p>
                          <p>До нового года осталось ${fullData.daysTillNewYear} ${declOfNum(fullData.daysTillNewYear, ['день', 'дня', 'дней'])}</p>`;
    }
    createMessage();
}
setInterval(displayDateInfo, 1000, '1 january 2022')
displayDateInfo('1 january 2022')