/* Задания

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов 
6) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

7) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

8) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

9) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

10) Фильмы должны быть отсортированы по алфавиту*/

'use strict';

document.addEventListener('DOMContentLoaded', () => {

    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };
    
    const addForm = document.querySelector('form.add'),
          movieList = document.querySelector('.promo__interactive-list'),
          addInput = addForm.querySelector('.adding__input'),
          checkBox = addForm.querySelector('[type="checkbox"]'),
          genre = document.querySelector('.promo__genre'),
          adv = document.querySelectorAll('.promo__adv img'),
          poster = document.querySelector('.promo__bg');
    
    console.log(addInput);

    addForm.addEventListener('submit', addNewFilm);
    
    movieDB.movies.sort();

    function createMovieList(films, parent) {
        parent.innerHTML = '';
        sortArr(films);
        films.forEach( (film, i) => {
        parent.innerHTML += `<li class="promo__interactive-item">${i + 1}.${film}
                                        <div class="delete"></div>
                                    </li>`;
         });

         document.querySelectorAll('.delete').forEach((btn, i) => {
            btn.addEventListener('click', () => {
                btn.parentElement.remove();
                movieDB.movies.splice(i, 1);
                createMovieList(films, parent);//восстанавливает правильную нумерацию
                console.log(movieDB.movies);
            });      //Удалить элемент из списка при клике на корзину
         });
    }

    function addNewFilm(e) {
        e.preventDefault();
        let newFilm = addInput.value;
        if (newFilm) {
            if (newFilm.length > 21) {
                newFilm = `${newFilm.substr(0,21)}...`;
            }
            const favorite = checkBox.checked;
            movieDB.movies.push(newFilm);
            sortArr(movieDB.movies);
            
            createMovieList(movieDB.movies, movieList);
            console.log(movieDB.movies);
            if(favorite) {
                console.log('ADDED TO FAVORITE');
            }
            e.target.reset();    //или addForm.reset();
        }

    }

    const deleteAdv = (arr) => {
        arr.forEach( (item) => {
            item.remove();
        });
    };

    const sortArr = (arr) => {
        arr.sort();
    };

    function setGenre(genreName) {
        genre.innerHTML = `<div class="promo__genre">${genreName}</div>`;
    }

    function setBackgroundImage(objj, bgUrl) {
        // poster.style.backgroundImage = 'url("img/bg.jpg")';
        objj.style.backgroundImage = bgUrl;
    }

    setBackgroundImage(poster, 'url("img/bg.jpg")');

    setGenre('ДРАМА');

    deleteAdv(adv);

    createMovieList(movieDB.movies, movieList);
});

