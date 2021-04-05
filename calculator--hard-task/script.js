// Задание 1
// a.
let lang = 'en';

if (lang === 'en') {
    console.log('monday, tuesday, wednesday, thursday, friday, saturday, sunday');
}  else if (lang === 'ru') {
    console.log('понедельник, вторник, среда, четверг, пятница, суббота, воскресенье');
} else {
    console.log('Значение переменной lang должно быть "en" или "ru"')
}

// b.
switch (lang) {
    case 'en':
    console.log('monday, tuesday, wednesday, thursday, friday, saturday, sunday')
    break;

    case 'ru':
    console.log('понедельник, вторник, среда, четверг, пятница, суббота, воскресенье')
    break;

    default:
    console.log('Значение переменной lang должно быть "en" или "ru"')
}

// c.
let arr = [];
arr['ru'] = ['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресенье'];
arr['en'] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

console.log(arr[lang]);

// OR

let languages = new Map([
    [ 'ru', 'понедельник, вторник, среда, четверг, пятница, суббота, воскресенье' ],
    [ 'eng', 'monday, tuesday, wednesday, thursday, friday, saturday, sunday']
])

languages.langRu = 'ru';
languages.langEn = 'en';

console.log(languages.get(lang));


// Задание 2

let namePerson = 'Максим',
    result;

result = (namePerson === 'Артем') ? 'директор' : result = (namePerson === 'Максим') ? 'преподаватель' : 'студент';

console.log(result);

