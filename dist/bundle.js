/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/calculator.js":
/*!***********************************!*\
  !*** ./src/modules/calculator.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*jshint esversion: 9*/

//CALCULATOR
function calculator() {
  const inputsFields = document.querySelectorAll('.calculating__choose_medium input');
  console.log(inputsFields);
  window.addEventListener('load', () => {
    inputsFields.forEach(item => {
      item.value = '';
    });
  });
  const result = document.querySelector('.calculating__result span');
  let sex, height, weight, age, ratio;
  if (localStorage.getItem('sex')) {
    sex = localStorage.getItem('sex');
  } else {
    sex = 'female';
    localStorage.setItem('sex', 'female');
  }
  if (localStorage.getItem('ratio')) {
    ratio = localStorage.getItem('ratio');
  } else {
    ratio = 1.375;
    localStorage.setItem('ratio', 1.375);
  }
  function initLocalSettings(selector, activeClass) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
      element.classList.remove(activeClass);
      if (element.getAttribute('id') === localStorage.getItem('sex')) {
        element.classList.add(activeClass);
      }
      if (element.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
        element.classList.add(activeClass);
      }
    });
  }
  initLocalSettings('#gender div', 'calculating__choose-item_active');
  initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');
  function calcTotal() {
    if (!sex || !height || !weight || !age || !ratio) {
      result.textContent = '---'; //проверка заполнения всех полей
      return;
    }
    if (sex === 'female') {
      result.textContent = Math.round((447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio);
    } else {
      result.textContent = Math.round((88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio);
    }
  }
  calcTotal();
  function getStaticInformation(selector, activeClass) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(elem => {
      elem.addEventListener('click', e => {
        if (e.target.getAttribute('data-ratio')) {
          //если e.target имеет атрибут data-ratio...
          ratio = +e.target.getAttribute('data-ratio');
          localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
        } else {
          sex = e.target.getAttribute('id');
          localStorage.setItem("sex", e.target.getAttribute('id'));
        }
        // localStorage.clear();
        console.log(ratio, sex);
        elements.forEach(item => {
          item.classList.remove(activeClass);
        });
        e.target.classList.add(activeClass);
        calcTotal();
      });
    });
  }
  getStaticInformation('#gender div', 'calculating__choose-item_active');
  getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');
  function getDinamicInformation(selector) {
    const input = document.querySelector(selector);
    input.addEventListener('input', () => {
      switch (input.getAttribute('id')) {
        case 'height':
          height = +input.value;
          break;
        case 'weight':
          weight = +input.value;
          break;
        case 'age':
          age = +input.value;
          break;
      }
      if (input.value.match(/\D/g)) {
        input.style.border = '2px solid red';
      } else {
        input.style.border = 'none';
      }
      calcTotal();
    });
  }
  getDinamicInformation('#height');
  getDinamicInformation('#weight');
  getDinamicInformation('#age');
}
/* harmony default export */ __webpack_exports__["default"] = (calculator);

/***/ }),

/***/ "./src/modules/cardsClasses.js":
/*!*************************************!*\
  !*** ./src/modules/cardsClasses.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./src/services/services.js");
/*jshint esversion: 7*/


function cardsClasses() {
  //Классы для карточек

  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      for (var _len = arguments.length, classes = new Array(_len > 6 ? _len - 6 : 0), _key = 6; _key < _len; _key++) {
        classes[_key - 6] = arguments[_key];
      }
      this.classes = classes;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 27; //exchange rate $ / UAH
      this.changeToUAH(); //вызываем метод в новом объекте
    }

    changeToUAH() {
      this.price = this.price * this.transfer;
    }

    //создание вёрстки
    render() {
      const element = document.createElement('div');
      if (this.classes.length === 0) {
        this.element = 'menu__item';
        element.classList.add(this.element);
      } else {
        this.classes.forEach(className => {
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

  (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu') //запрос данных из db.json на сервере
  .then(data => {
    //и их обработка конструктором MenuCard и render
    data.forEach(obj => {
      //для создания карточек меню
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

/* harmony default export */ __webpack_exports__["default"] = (cardsClasses);

/***/ }),

/***/ "./src/modules/modal.js":
/*!******************************!*\
  !*** ./src/modules/modal.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": function() { return /* binding */ closeModal; },
/* harmony export */   "openModal": function() { return /* binding */ openModal; }
/* harmony export */ });
/*jshint esversion: 8*/

function openModal(modalSelector, modalTimer) {
  const modal = document.querySelector(modalSelector);
  modal.classList.add('show');
  modal.classList.remove('hide');
  document.body.style.overflow = 'hidden'; //отключает прокрутку страницы вниз

  console.log(modalTimer);
  if (modalTimer) {
    clearInterval(modalTimer); //предотвращает автооткрытие окна после открытия окна пользователем
  }
}

function closeModal(modalSelector) {
  const modal = document.querySelector(modalSelector);
  modal.classList.add('hide');
  modal.classList.remove('show');
  document.body.style.overflow = 'auto'; //включает прокрутку страницы
}

function modal(triggerSelector, modalSelector, modalTimer) {
  //Modal

  const modalTrigger = document.querySelectorAll(triggerSelector),
    modal = document.querySelector(modalSelector),
    modalCloseBtn = document.querySelector('[data-close]'),
    modalDialog = modal.querySelector('.modal__dialog');
  modalTrigger.forEach(btn => {
    btn.addEventListener('click', () => openModal(modalSelector, modalTimer));
  });

  // modalCloseBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', e => {
    //закрывает окно при клике на подложку
    if (e.target === modal /*&& e.target !== modalDialog*/ || e.target.getAttribute('data-close') === "") {
      closeModal(modalSelector);
    }
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
      closeModal(modalSelector);
    }
  });
  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      openModal(modalSelector, modalTimer);
      window.removeEventListener('scroll', showModalByScroll); //предотвращает повторное открытие modal
    } //условие означает что страница проскроллена до низа и открывается modal
  }

  window.addEventListener('scroll', showModalByScroll);
}
/* harmony default export */ __webpack_exports__["default"] = (modal);



/***/ }),

/***/ "./src/modules/sendUsersForm.js":
/*!**************************************!*\
  !*** ./src/modules/sendUsersForm.js ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./src/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./src/services/services.js");
/*jshint esversion: 10*/



function sendUsersForm(formSelector, modalTimer) {
  //Send users form

  const forms = document.querySelectorAll(formSelector);
  console.log(forms);
  const messages = {
    loading: "img/form/spinner.svg",
    success: 'Thank you, we will connect with you as soon as it possible!',
    failure: 'It is something wrong...'
  };

  // const postData = async (url, data) => {    //async указывает на асинхронный код в ф-ции
  //     const res = await fetch(url, {         //await приостанавливает выполнение js до завершения запроса на сервер
  //         method: 'POST',
  //         headers: {'Content-type': 'application/json'},   //при отправке formData headers не нужен
  //         body: data
  //     });
  //     return await res.json();
  // };

  forms.forEach(item => {
    bindPostData(item);
  });
  function bindPostData(form) {
    form.addEventListener('submit', e => {
      console.log('submited');
      e.preventDefault();

      // const statusMessage = document.createElement('div');
      const statusMessage = document.createElement('img'); //для использования спиннера
      statusMessage.src = messages.loading;
      statusMessage.style.CSSText = `
                            display: block;
                            margin: 0 auto;
                            `;
      // form.append(statusMessage);
      form.insertAdjacentElement('afterend', statusMessage);

      //форматирование данных формы для отправки на сервер
      const formData = new FormData(form); //для правильной работы FormData в 
      //inputs & options формы ВСЕГДА должен
      //быть указан атрибут "name" !!!
      // const object = {};
      // formData.forEach(function (value, key) {
      //     object[key] = value;
      // });
      const json = JSON.stringify(Object.fromEntries(formData.entries())); //entries превращает объект в массив массивов
      //fromEntries преобразует массив массивов в объект
      // fetch('server.php', {
      //     method: 'POST',
      //     headers: {'Content-type': 'application/json'},   //при отправке formData headers не нужен
      //     body: JSON.stringify(object)
      // })
      (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json /*JSON.stringify(object)*/)
      // .then(data => data.text())
      .then(data => {
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
    (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalTimer);
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
      (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
    }, 6000);
  }

  //to start json-server: npx json-server --watch db.json

  // fetch('db.json')
  fetch('http://localhost:3000/menu').then(data => data.json()).then(res => console.log(res));
}
/* harmony default export */ __webpack_exports__["default"] = (sendUsersForm);

/***/ }),

/***/ "./src/modules/slider.js":
/*!*******************************!*\
  !*** ./src/modules/slider.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//SLIDER
function slider(_ref) {
  let {
    container,
    slide,
    prevArrow,
    nextArrow,
    totalCounter,
    currentCounter,
    wrapper,
    field
  } = _ref;
  const prev = document.querySelector(prevArrow);
  const slider = document.querySelector(container);
  const slides = document.querySelectorAll(slide);
  const next = document.querySelector(nextArrow);
  const current = document.querySelector(currentCounter);
  const total = document.querySelector(totalCounter);
  const slidesField = document.querySelector(field);
  const slidesWrapper = document.querySelector(wrapper);
  let slideIndex = 1;
  const width = window.getComputedStyle(slidesWrapper).width; //получаем ширину окна для одного слайда
  let offset = 0;
  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;
  } else {
    total.textContent = `slides.length`;
    current.textContent = slideIndex;
  }
  slidesField.style.width = 100 * slides.length + '%'; //определяем ширину поля для всех слайдов
  slidesField.style.display = 'flex'; //установка слайдов в горизонтальную полосу
  slidesField.style.transition = '0.5s all';
  slidesWrapper.style.overflow = 'hidden'; //скрыть все слайды кроме slidesWrapper
  slides.forEach(slide => {
    //установка одинаковой ширины для всех слайдов
    slide.style.width = slidesWrapper;
  });
  slider.style.position = 'relative';
  const indicators = document.createElement('ol'),
    //indicators panel
    dots = [];
  indicators.classList.add('carousel-indicators');
  slider.append(indicators);
  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li'); //indicators
    dot.setAttribute('data-slide-to', i + 1); //'привязка' индикаторов к слайдам
    dot.classList.add('dot');
    if (i == 0) {
      dot.style.opacity = 1;
    }
    indicators.append(dot);
    dots.push(dot);
  }
  function deleteNotDigits(str) {
    return +str.replace(/\D/g, '');
  }
  next.addEventListener('click', () => {
    // if(offset == +width.slice(0, width.length-2) * (slides.length - 1)) {   
    if (offset == deleteNotDigits(width) * (slides.length - 1)) {
      //если слайдер в конце, показывать первый слайд
      offset = 0;
    } else {
      // offset += +width.slice(0, width.length-2); 
      offset += deleteNotDigits(width);
    }
    slidesField.style.transform = `translateX(-${offset}px)`;
    if (slideIndex == slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }
    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }
    dots.forEach(dot => {
      dot.style.opacity = '.5';
    });
    dots[slideIndex - 1].style.opacity = '1';
  });
  prev.addEventListener('click', () => {
    if (offset == 0) {
      // offset = +width.slice(0, width.length-2) * (slides.length - 1);
      offset = deleteNotDigits(width) * (slides.length - 1);
    } else {
      // offset -= +width.slice(0, width.length-2); 
      offset -= deleteNotDigits(width); //все нецифры удаляем
    }

    slidesField.style.transform = `translateX(-${offset}px)`;
    if (slideIndex == 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }
    if (slideIndex < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }
    dots.forEach(dot => {
      dot.style.opacity = '.5';
    });
    dots[slideIndex - 1].style.opacity = '1';
  });
  dots.forEach(dot => {
    dot.addEventListener('click', e => {
      const slideTo = e.target.getAttribute('data-slide-to');
      slideIndex = slideTo;
      // offset = +width.slice(0, width.length-2) * (slideTo - 1); 
      offset = deleteNotDigits(width) * (slideTo - 1);
      slidesField.style.transform = `translateX(-${offset}px)`;
      if (slides.length < 10) {
        current.textContent = `0${slideIndex}`;
      } else {
        current.textContent = slideIndex;
      }
      dots.forEach(dot => {
        dot.style.opacity = '.5';
      });
      dots[slideIndex - 1].style.opacity = '1';
    });
  });
}
/* harmony default export */ __webpack_exports__["default"] = (slider);

/***/ }),

/***/ "./src/modules/tabs.js":
/*!*****************************!*\
  !*** ./src/modules/tabs.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*jshint esversion: 9*/

function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
  //Tabs
  const tabs = document.querySelectorAll(tabsSelector),
    tabsContent = document.querySelectorAll(tabsContentSelector),
    tabsParent = document.querySelector(tabsParentSelector);
  console.log(tabsParent);
  function hideTabContent() {
    tabsContent.forEach(item => {
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
    });
    tabs.forEach(item => {
      item.classList.remove(activeClass);
    });
  }
  function showTabContent() {
    let i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add('tabheader__item_active');
  }
  hideTabContent();
  showTabContent();
  tabsParent.addEventListener('click', e => {
    const target = e.target;
    if (target && target.classList.contains(tabsSelector.slice(1))) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });
}
/* harmony default export */ __webpack_exports__["default"] = (tabs); //экспорт ф-ции tabs

/***/ }),

/***/ "./src/modules/timer.js":
/*!******************************!*\
  !*** ./src/modules/timer.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function timer(id, deadline) {
  function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()),
      //количество миллисекунд до deadline
      days = Math.floor(t / (1000 * 60 * 60 * 24)),
      //кол-во суток оставшихся до deadline, в скобках кол-во миллисек. в сутках
      //   hours =Math.floor(((t / (1000 * 60 * 60 * 24)) - days) * 24),
      hours = Math.floor(t / (1000 * 60 * 60) % 24),
      //от общего кол-ва часов берём остаток от деления на 24
      minutes = Math.floor(t / (1000 * 60) % 60),
      seconds = Math.floor(t / 1000 % 60);
    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }
  function getZero(num) {
    //добавляет 0 если < 10
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
    updateClock(); //запускаем здесь для того чтоб избежать мигания таймера на странице

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
  setClock(id, deadline);
}
/* harmony default export */ __webpack_exports__["default"] = (timer);

/***/ }),

/***/ "./src/services/services.js":
/*!**********************************!*\
  !*** ./src/services/services.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResource": function() { return /* binding */ getResource; },
/* harmony export */   "postData": function() { return /* binding */ postData; }
/* harmony export */ });
/*jshint esversion: 8 */
const postData = async (url, data) => {
  //async указывает на асинхронный код в ф-ции
  const res = await fetch(url, {
    //await приостанавливает выполнение js до завершения запроса на сервер
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    //при отправке formData headers не нужен
    body: data
  });
  return await res.json();
};

//GET MENU DATA FROM SERVER
const getResource = async url => {
  const res = await fetch(url);
  if (!res.ok) {
    //если ошибка в результате запроса
    throw new Error(`Could not fetch ${url}, status: ${res.status}`);
  }
  return await res.json();
};



/***/ }),

/***/ "./node_modules/polyfill-nodelist-foreach/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/polyfill-nodelist-foreach/index.js ***!
  \*********************************************************/
/***/ (function() {

if (window && window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var polyfill_nodelist_foreach__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! polyfill-nodelist-foreach */ "./node_modules/polyfill-nodelist-foreach/index.js");
/* harmony import */ var polyfill_nodelist_foreach__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(polyfill_nodelist_foreach__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_calculator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/calculator */ "./src/modules/calculator.js");
/* harmony import */ var _modules_cardsClasses__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/cardsClasses */ "./src/modules/cardsClasses.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/modal */ "./src/modules/modal.js");
/* harmony import */ var _modules_sendUsersForm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/sendUsersForm */ "./src/modules/sendUsersForm.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./src/modules/slider.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/tabs */ "./src/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/timer */ "./src/modules/timer.js");
/*jshint esversion: 8*/











document.addEventListener('DOMContentLoaded', () => {
  //     const calculator = require('./modules/calculator'),
  //           cardsClasses = require('./modules/cardsClasses'),
  //           modal = require('./modules/modal'),
  //           sendUsersForm = require('./modules/sendUsersForm'),
  //           slider = require('./modules/slider'),
  //           tabs = require('./modules/tabs'),
  //           timer = require('./modules/timer');
  const modalTimer = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__.openModal)('.modal', modalTimer), 30000); //show modal in 30 sec

  (0,_modules_calculator__WEBPACK_IMPORTED_MODULE_1__["default"])();
  (0,_modules_cardsClasses__WEBPACK_IMPORTED_MODULE_2__["default"])();
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__["default"])('[data-modal]', '.modal', modalTimer);
  (0,_modules_sendUsersForm__WEBPACK_IMPORTED_MODULE_4__["default"])('form', modalTimer);
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__["default"])({
    container: '.offer__slider',
    slide: '.offer__slide',
    prevArrow: '.offer__slider-prev',
    nextArrow: '.offer__slider-next',
    totalCounter: '#total',
    currentCounter: '#current',
    wrapper: '.offer__slider-wrapper',
    field: '.offer__slider-inner'
  });
  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_6__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
  (0,_modules_timer__WEBPACK_IMPORTED_MODULE_7__["default"])('.timer', '2023-05-04');
});
}();
/******/ })()
;
//# sourceMappingURL=bundle.js.map