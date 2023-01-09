/*jshint esversion: 8*/
// "use strict";
document.addEventListener('DOMContentLoaded', () => {
//Tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');
    console.log(tabsParent);

    function hideTabContent() {
        tabsContent.forEach( (item) => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
        
        tabs.forEach( item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
         tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (e) => {
        const target = e.target;

        if(target && target.classList.contains('tabheader__item')) {
            tabs.forEach( (item, i) => {
                if(target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

//Modal

    const modalTrigger = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal'),
          modalCloseBtn = document.querySelector('[data-close]'),
          modalDialog = modal.querySelector('.modal__dialog');

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';  //отключает прокрутку страницы вниз
        clearInterval(modalTimer);    //предотвращает автооткрытие окна после открытия окна пользователем
    }
    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';    //включает прокрутку страницы
    }

    modalTrigger.forEach((btn) => {
        btn.addEventListener('click', openModal);
    });

    // modalCloseBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {         //закрывает окно при клике на подложку
        if(e.target === modal /*&& e.target !== modalDialog*/ || e.target.getAttribute('data-close')==="") {
            closeModal();
        }
    }); 
    
    document.addEventListener('keydown', (e) => {
        if(e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    const modalTimer = setTimeout(openModal, 30000);    //show modal in 30 sec

    function showModalByScroll() {
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);  //предотвращает повторное открытие modal
        }  //условие означает что страница проскроллена до низа и открывается modal
    }

    window.addEventListener('scroll', showModalByScroll);

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

//get menu datas from server
const getResource = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {                  //если ошибка в результате запроса
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    return await res.json();
};

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


//Timer
    const deadline = '2022-11-18';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()), //количество миллисекунд до deadline
              days = Math.floor(t / (1000 * 60 * 60 * 24)),  //кол-во суток оставшихся до deadline, в скобках кол-во миллисек. в сутках
            //   hours =Math.floor(((t / (1000 * 60 * 60 * 24)) - days) * 24),
              hours = Math.floor((t / (1000 * 60 * 60) % 24)),  //от общего кол-ва часов берём остаток от деления на 24
              minutes = Math.floor((t / (1000 * 60) % 60)),
              seconds = Math.floor((t / 1000) % 60);

              return {
                'total': t,
                'days': days,
                'hours': hours,
                'minutes': minutes,
                'seconds': seconds
              };
    }

    function getZero(num) {             //добавляет 0 если < 10
        if (num >= 0 && num < 10) {
            // return '0' + num;
            return `0${num}`;
        } else {
            return `${num}`;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);

              updateClock();  //запускаем здесь для того чтоб избежать мигания таймера на странице

              function updateClock() {
                const t = getTimeRemaining(endtime);
                days.innerHTML = getZero(t.days);
                hours.innerHTML = getZero(t.hours);
                minutes.innerHTML = getZero(t.minutes);
                seconds.innerHTML = getZero(t.seconds);

                if (t.total <= 0) {
                    clearInterval(timeInterval);
                }
              }
              
    }

    setClock('.timer', deadline);

//Send users form

    const forms = document.querySelectorAll('form');
    console.log(forms);
    const messages = {
        loading: "img/form/spinner.svg",
        success: 'Thank you, we will connect with you as soon as it possible!',
        failure: 'It is something wrong...'
    };

    const postData = async (url, data) => {    //async указывает на асинхронный код в ф-ции
        const res = await fetch(url, {         //await приостанавливает выполнение js до завершения запроса на сервер
            method: 'POST',
            headers: {'Content-type': 'application/json'},   //при отправке formData headers не нужен
            body: data
        });
        return await res.json();
    };

    forms.forEach((item) => {
        bindPostData(item);
    });
    
    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            console.log('submited');
            e.preventDefault();

            // const statusMessage = document.createElement('div');
            const statusMessage = document.createElement('img');   //для использования спиннера
            statusMessage.src = messages.loading;
            statusMessage.style.CSSText = `
                            display: block;
                            margin: 0 auto;
                            `;
            // form.append(statusMessage);
            form.insertAdjacentElement('afterend', statusMessage);

        //форматирование данных формы для отправки на сервер
            const formData = new FormData(form);    //для правильной работы FormData в 
                                                    //inputs & options формы ВСЕГДА должен
                                                    //быть указан атрибут "name" !!!
            // const object = {};
            // formData.forEach(function (value, key) {
            //     object[key] = value;
            // });
            const json = JSON.stringify(Object.fromEntries(formData.entries()));    //entries превращает объект в массив массивов
                                                                                    //fromEntries преобразует массив массивов в объект
            // fetch('server.php', {
            //     method: 'POST',
            //     headers: {'Content-type': 'application/json'},   //при отправке formData headers не нужен
            //     body: JSON.stringify(object)
            // })
            postData('http://localhost:3000/requests', json/*JSON.stringify(object)*/)
            // .then(data => data.text())
            .then((data) => {
                   console.log(data);
                   showThanksModal(messages.success);
                   form.reset();                   
                   statusMessage.remove();   
            }).catch(() => {
                showThanksModal(messages.failure);
            }).finally(() => {
                form.reset();
            });

            // request.send(formData);             //отправка данных FormData
            // request.send(json);                 //отправка данных JSON

        });
    }
    //изменение модального окна после отправки формы
    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class='modal__content'>
                <div class='modal__close' data-close>&times;</div>
                <div class='modal__title'>${message}</div>
            </div>`;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.remove('hide');
            prevModalDialog.classList.add('show');
            closeModal();
        }, 6000);
    }

    //to start json-server: npx json-server --watch db.json

    // fetch('db.json')
    fetch('http://localhost:3000/menu')
        .then(data => data.json())
        .then(res => console.log(res));

 });