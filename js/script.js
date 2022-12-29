/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

const movieDB = {
    movies: [
        "Логан",
        "Лига справедливости",
        "Ла-ла лэнд",
        "Одержимость",
        "Скотт Пилигрим против..."
    ]
};

const adv = document.querySelectorAll('.promo__adv img');
adv.forEach( (item) => {
	item.remove();
});

const genre = document.querySelector('.promo__genre');
genre.innerHTML = ' <div class="promo__genre">ДРАМА</div>';

const poster = document.querySelector('.promo__bg');
poster.style.backgroundImage = 'url("img/bg.jpg")';

const movieItems = document.querySelectorAll('.promo__interactive-item');
movieDB.movies.sort();
movieItems.forEach( (item, i) => {
    movieItems[i].textContent = `${i+1}.` + movieDB.movies[i];
});

