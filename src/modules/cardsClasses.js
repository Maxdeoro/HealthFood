/*jshint esversion: 7*/

import { getResource } from "../services/services";

function cardsClasses(){
    //Классы для карточек

class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
        this.src = src;
        this.alt = alt;
        this.title = title;
        this.descr = descr;
        this.price = price;
        this.classes = classes;
        this.parent = document.querySelector(parentSelector);
        this.transfer = 27;         //exchange rate $ / UAH
        this.changeToUAH();         //вызываем метод в новом объекте
    }

    changeToUAH() {
        this.price = this.price * this.transfer;
    }
    
    //создание вёрстки
    render() {
        const element = document.createElement('div');
        if(this.classes.length === 0) {
            this.element = 'menu__item';
            element.classList.add(this.element);
        } else {
            this.classes.forEach((className) => {
                element.classList.add(className);
            });
        }

        element.innerHTML = `
                                <img src=${this.src} alt=${this.alt}>
                                <h3 class="menu__item-subtitle">${this.title}</h3>
                                <div class="menu__item-descr">${this.descr}</div>
                                <div class="menu__item-divider"></div>
                                <div class="menu__item-price">
                                    <div class="menu__item-cost">Цена:</div>
                                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                                </div>
                            `;
        this.parent.append(element);
    }
} 

//GET MENU DATA FROM SERVER
// const getResource = async (url) => {
//     const res = await fetch(url);

//     if (!res.ok) {                  //если ошибка в результате запроса
//         throw new Error(`Could not fetch ${url}, status: ${res.status}`);
//     }
//     return await res.json();
// };

//creating menuCards without using class MenuCard
// getResource('http://localhost:3000/menu')
//     .then(data => createCard(data));
// function createCard(data) {
//     data.forEach(({img, altimg, title, descr, price}) => {
//         const element = document.createElement('div');
//         element.classList.add('menu_item');
//         element.innerHTML = `
//         <img src=${img} alt=${altimg}>
//         <h3 class="menu__item-subtitle">${title}</h3>
//         <div class="menu__item-descr">${descr}</div>
//         <div class="menu__item-divider"></div>
//         <div class="menu__item-price">
//             <div class="menu__item-cost">Цена:</div>
//             <div class="menu__item-total"><span>${price}</span> грн/день</div>
//         </div>
//         `;
//         document.querySelector('.menu .container').append(element);
//     });
// }

getResource('http://localhost:3000/menu')       //запрос данных из db.json на сервере
.then(data => {                                 //и их обработка конструктором MenuCard и render
    data.forEach(obj => {                       //для создания карточек меню
        new MenuCard(obj.img, obj.altimg, obj.title, obj.descr, obj.price, '.menu .container').render();
    });
});
//===
// getResource('http://localhost:3000/menu')       //запрос данных из db.json на сервере
// .then(data => {                                 //и их обработка конструктором MenuCard и render
//     data.forEach(({img, altimg, title, descr, price}) => {                       //для создания карточек меню
//         new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
//     });
// });
}

export default cardsClasses;