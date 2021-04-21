
function displayDateInfo(deadline) {
    let div = document.querySelector('div'),
        date = new Date();


    function getFullData() {
        let dayOfWeek = date.getDay(),
            hours = date.getHours(),
            time = date.toLocaleTimeString('en')
        dateNow = new Date().getTime(),
            dateStop = new Date('1 january 2022').getTime(),
            daysTillNewYear = Math.floor(((dateStop - dateNow) / 1000) / 60 / 60 / 24);

        return {
            dayOfWeek,
            hours,
            time,
            daysTillNewYear
        }
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

        function declOfNum(number, names) {
            let cases = [2, 0, 1, 1, 1, 2];
            return names[
                (number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]
            ];
        }

        div.innerHTML = `<p>${createGreeting()}</p>
            <p>Сегодня: ${getDaysOfWeekRus()}</p>
            <p>Текущее время: ${fullData.time}</p>
            <p>До нового года осталось ${fullData.daysTillNewYear} ${declOfNum(fullData.daysTillNewYear, ['день', 'дня', 'дней'])}</p>`;
            if(fullData.daysTillNewYear > 0) {
                let intervalId = setInterval(displayDateInfo, 1000)
            } else {
                clearInterval(intervalId);
            }
    }
    createMessage();
}
displayDateInfo()