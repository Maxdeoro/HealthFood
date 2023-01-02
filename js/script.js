"use strict";
document.addEventListener('DOMContentLoaded', () => {
//Tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');
    console.log(tabsParent);

    function hideTabContent() {
        tabsContent.forEach( (item) => {
            // item.style.display = 'none';
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
        
        tabs.forEach( item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        //  tabsContent[i].style.display = 'block';
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

class MenuCards {
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

const vegyCard = new MenuCards("img/tabs/vegy.jpg",
                                "vegy",
                                'Menu "Fitness"',
                                'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
                                8.48,
                                '.menu .container',
                                'menu__item');

const eliteCard = new MenuCards('img/tabs/elite.jpg',
                                'elite',
                                'Menu "Premium"',
                                'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
                                20.40,
                                '.menu .container',
                                'menu__item');

const postCard = new MenuCards('img/tabs/post.jpg',
                                'post',
                                'Menu "Post"',
                                'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
                                16,
                                '.menu .container',
                                'menu__item');

const myCard = new MenuCards("img/tabs/hamburger.jpg",
                             "hamburger",
                             'Menu "Hamburger"', 
                             "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.ДЁШЕВО и ВКУСНО, живи полной жизнью!",
                             7,
                             '.menu .container',
                             'menu__item'
                             );
myCard.render();
vegyCard.render();
postCard.render();
eliteCard.render();


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
    const messages = {
        loading: "img/form/spinner.svg",
        success: 'Thank you, we will connect with you as soon as it possible!',
        failure: 'It is something wrong...'
    };

    forms.forEach((item) => {
        postData(item);
    });
    
    function postData(form) {
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
            const object = {};
            formData.forEach(function (value, key) {
                object[key] = value;
            });

            fetch('server.php', {
                method: 'POST',
                headers: {'Content-type': 'application/json'},   //при отправке formData headers не нужен
                body: JSON.stringify(object)
            }).then(data => data.text())
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

 });