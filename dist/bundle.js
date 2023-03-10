/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/calculator.js":
/*!***********************************!*\
  !*** ./src/modules/calculator.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/*jshint esversion: 9*/

//CALCULATOR
function calculator() {
const inputsFields = document.querySelectorAll('.calculating__choose_medium input');
console.log(inputsFields);
window.addEventListener('load', () => {
    inputsFields.forEach((item) => {
        item.value = '';
    });
});

const result = document.querySelector('.calculating__result span');

let sex , 
    height, 
    weight, 
    age, 
    ratio;

if(localStorage.getItem('sex')) {
     sex = localStorage.getItem('sex');
} else {
     sex = 'female';
     localStorage.setItem('sex', 'female');
} 
if(localStorage.getItem('ratio')) {
    ratio = localStorage.getItem('ratio');
} else {
    ratio = 1.375;
    localStorage.setItem('ratio', 1.375);
}

function initLocalSettings(selector, activeClass) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element) => {
        element.classList.remove(activeClass);
        if(element.getAttribute('id') === localStorage.getItem('sex')) {
            element.classList.add(activeClass);
        }
        if(element.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
            element.classList.add(activeClass);
        }
    });
}
initLocalSettings('#gender div', 'calculating__choose-item_active');
initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

function calcTotal() {
    if (!sex || !height || !weight || !age || !ratio) {
        result.textContent = '---';          //???????????????? ???????????????????? ???????? ??????????
        return;
    }

    if (sex === 'female') {
        result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
    } else {
        result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
    }
}
calcTotal();

function getStaticInformation(selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach((elem) => {
        elem.addEventListener('click', (e) => {
            if (e.target.getAttribute('data-ratio')) {          //???????? e.target ?????????? ?????????????? data-ratio...
                ratio = +e.target.getAttribute('data-ratio');
                localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
            } else {
                sex = e.target.getAttribute('id');
                localStorage.setItem("sex", e.target.getAttribute('id'));
            }
            // localStorage.clear();
            console.log(ratio, sex);

            elements.forEach((item) => {
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
        switch(input.getAttribute('id')) {
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

        if(input.value.match(/\D/g)) {
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calculator);

/***/ }),

/***/ "./src/modules/cardsClasses.js":
/*!*************************************!*\
  !*** ./src/modules/cardsClasses.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./src/services/services.js");
/*jshint esversion: 7*/



function cardsClasses(){
    //???????????? ?????? ????????????????

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
        this.changeToUAH();         //???????????????? ?????????? ?? ?????????? ??????????????
    }

    changeToUAH() {
        this.price = this.price * this.transfer;
    }
    
    //???????????????? ??????????????
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
                                    <div class="menu__item-cost">????????:</div>
                                    <div class="menu__item-total"><span>${this.price}</span> ??????/????????</div>
                                </div>
                            `;
        this.parent.append(element);
    }
} 

//GET MENU DATA FROM SERVER
// const getResource = async (url) => {
//     const res = await fetch(url);

//     if (!res.ok) {                  //???????? ???????????? ?? ???????????????????? ??????????????
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
//             <div class="menu__item-cost">????????:</div>
//             <div class="menu__item-total"><span>${price}</span> ??????/????????</div>
//         </div>
//         `;
//         document.querySelector('.menu .container').append(element);
//     });
// }

(0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu')       //???????????? ???????????? ???? db.json ???? ??????????????
.then(data => {                                 //?? ???? ?????????????????? ?????????????????????????? MenuCard ?? render
    data.forEach(obj => {                       //?????? ???????????????? ???????????????? ????????
        new MenuCard(obj.img, obj.altimg, obj.title, obj.descr, obj.price, '.menu .container').render();
    });
});
//===
// getResource('http://localhost:3000/menu')       //???????????? ???????????? ???? db.json ???? ??????????????
// .then(data => {                                 //?? ???? ?????????????????? ?????????????????????????? MenuCard ?? render
//     data.forEach(({img, altimg, title, descr, price}) => {                       //?????? ???????????????? ???????????????? ????????
//         new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
//     });
// });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cardsClasses);

/***/ }),

/***/ "./src/modules/modal.js":
/*!******************************!*\
  !*** ./src/modules/modal.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });
/*jshint esversion: 8*/

function openModal(modalSelector, modalTimer) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';  //?????????????????? ?????????????????? ???????????????? ????????

    console.log(modalTimer);
    if (modalTimer) {
    clearInterval(modalTimer);    //?????????????????????????? ???????????????????????? ???????? ?????????? ???????????????? ???????? ??????????????????????????
    }
}
function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';    //???????????????? ?????????????????? ????????????????
}

function modal(triggerSelector, modalSelector, modalTimer){
    //Modal

    const modalTrigger = document.querySelectorAll(triggerSelector),
          modal = document.querySelector(modalSelector),
          modalCloseBtn = document.querySelector('[data-close]'),
          modalDialog = modal.querySelector('.modal__dialog');

    modalTrigger.forEach((btn) => {
        btn.addEventListener('click', () => openModal(modalSelector, modalTimer));
    });

    // modalCloseBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {         //?????????????????? ???????? ?????? ?????????? ???? ????????????????
        if(e.target === modal /*&& e.target !== modalDialog*/ || e.target.getAttribute('data-close')==="") {
            closeModal(modalSelector);
        }
    }); 
    
    document.addEventListener('keydown', (e) => {
        if(e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });

    function showModalByScroll() {
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(modalSelector, modalTimer);
            window.removeEventListener('scroll', showModalByScroll);  //?????????????????????????? ?????????????????? ???????????????? modal
        }  //?????????????? ???????????????? ?????? ???????????????? ???????????????????????? ???? ???????? ?? ?????????????????????? modal
    }

    window.addEventListener('scroll', showModalByScroll);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./src/modules/sendUsersForm.js":
/*!**************************************!*\
  !*** ./src/modules/sendUsersForm.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./src/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./src/services/services.js");
/*jshint esversion: 10*/




function sendUsersForm(formSelector, modalTimer){
    //Send users form

    const forms = document.querySelectorAll(formSelector);
    console.log(forms);
    const messages = {
        loading: "img/form/spinner.svg",
        success: 'Thank you, we will connect with you as soon as it possible!',
        failure: 'It is something wrong...'
    };

    // const postData = async (url, data) => {    //async ?????????????????? ???? ?????????????????????? ?????? ?? ??-??????
    //     const res = await fetch(url, {         //await ???????????????????????????????? ???????????????????? js ???? ???????????????????? ?????????????? ???? ????????????
    //         method: 'POST',
    //         headers: {'Content-type': 'application/json'},   //?????? ???????????????? formData headers ???? ??????????
    //         body: data
    //     });
    //     return await res.json();
    // };

    forms.forEach((item) => {
        bindPostData(item);
    });
    
    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            console.log('submited');
            e.preventDefault();

            // const statusMessage = document.createElement('div');
            const statusMessage = document.createElement('img');   //?????? ?????????????????????????? ????????????????
            statusMessage.src = messages.loading;
            statusMessage.style.CSSText = `
                            display: block;
                            margin: 0 auto;
                            `;
            // form.append(statusMessage);
            form.insertAdjacentElement('afterend', statusMessage);

        //???????????????????????????? ???????????? ?????????? ?????? ???????????????? ???? ????????????
            const formData = new FormData(form);    //?????? ???????????????????? ???????????? FormData ?? 
                                                    //inputs & options ?????????? ???????????? ????????????
                                                    //???????? ???????????? ?????????????? "name" !!!
            // const object = {};
            // formData.forEach(function (value, key) {
            //     object[key] = value;
            // });
            const json = JSON.stringify(Object.fromEntries(formData.entries()));    //entries ???????????????????? ???????????? ?? ???????????? ????????????????
                                                                                    //fromEntries ?????????????????????? ???????????? ???????????????? ?? ????????????
            // fetch('server.php', {
            //     method: 'POST',
            //     headers: {'Content-type': 'application/json'},   //?????? ???????????????? formData headers ???? ??????????
            //     body: JSON.stringify(object)
            // })
            (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json/*JSON.stringify(object)*/)
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

            // request.send(formData);             //???????????????? ???????????? FormData
            // request.send(json);                 //???????????????? ???????????? JSON

        });
    }
    //?????????????????? ???????????????????? ???????? ?????????? ???????????????? ??????????
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
    fetch('http://localhost:3000/menu')
        .then(data => data.json())
        .then(res => console.log(res));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sendUsersForm);

/***/ }),

/***/ "./src/modules/slider.js":
/*!*******************************!*\
  !*** ./src/modules/slider.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/*jshint esversion: 9*/

//SLIDER
function slider({container, slide, prevArrow, nextArrow, totalCounter, currentCounter, wrapper, field}) {
    const prev = document.querySelector(prevArrow);
    const slider = document.querySelector(container);
    const slides = document.querySelectorAll(slide);
    const next = document.querySelector(nextArrow);
    const current = document.querySelector(currentCounter);
    const total = document.querySelector(totalCounter);
    const slidesField = document.querySelector(field);
    const slidesWrapper = document.querySelector(wrapper);
    let slideIndex = 1;
    const width = window.getComputedStyle(slidesWrapper).width;           //???????????????? ???????????? ???????? ?????? ???????????? ????????????
    let offset = 0;

if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;
} else {
    total.textContent = `slides.length`;
    current.textContent = slideIndex;
}

slidesField.style.width = 100 * slides.length + '%';        //???????????????????? ???????????? ???????? ?????? ???????? ??????????????
slidesField.style.display = 'flex';                         //?????????????????? ?????????????? ?? ???????????????????????????? ????????????
slidesField.style.transition = '0.5s all';

slidesWrapper.style.overflow = 'hidden';                    //???????????? ?????? ???????????? ?????????? slidesWrapper
slides.forEach((slide) => {                                 //?????????????????? ???????????????????? ???????????? ?????? ???????? ??????????????
    slide.style.width = slidesWrapper;
});

slider.style.position = 'relative';

const indicators = document.createElement('ol'),        //indicators panel
      dots = [];
indicators.classList.add('carousel-indicators');
slider.append(indicators);

for(let i=0; i<slides.length; i++) {
    const dot = document.createElement('li');          //indicators
    dot.setAttribute('data-slide-to', i + 1);           //'????????????????' ?????????????????????? ?? ??????????????
    dot.classList.add('dot');
    if(i == 0) {
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
    if(offset == deleteNotDigits(width) * (slides.length - 1)) {     //???????? ?????????????? ?? ??????????, ???????????????????? ???????????? ??????????
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

    if(slides.length < 10) {
        current.textContent = `0${slideIndex}`;
    } else {
        current.textContent = slideIndex;
    }

    dots.forEach((dot) => {
        dot.style.opacity = '.5';
    });
    dots[slideIndex - 1].style.opacity = '1';
});
prev.addEventListener('click', () => {
    if(offset == 0) {
        // offset = +width.slice(0, width.length-2) * (slides.length - 1);
        offset = deleteNotDigits(width) * (slides.length - 1);
    } else {
        // offset -= +width.slice(0, width.length-2); 
        offset -= deleteNotDigits(width);      //?????? ?????????????? ??????????????
    }
    slidesField.style.transform = `translateX(-${offset}px)`;
    
    if(slideIndex == 1) {
        slideIndex = slides.length;
    } else {
        slideIndex--;
    }

    if(slideIndex < 10) {
        current.textContent = `0${slideIndex}`;
    } else {
        current.textContent = slideIndex;
    }

    dots.forEach((dot) => {
        dot.style.opacity = '.5';
    });
    dots[slideIndex - 1].style.opacity = '1';
});

dots.forEach((dot) => {
    dot.addEventListener('click', (e) => {
        const slideTo = e.target.getAttribute('data-slide-to');
        slideIndex = slideTo;
        // offset = +width.slice(0, width.length-2) * (slideTo - 1); 
        offset = deleteNotDigits(width) * (slideTo - 1);
        slidesField.style.transform = `translateX(-${offset}px)`;

        if(slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        dots.forEach((dot) => {
            dot.style.opacity = '.5';
        });
        dots[slideIndex - 1].style.opacity = '1';
    });
});
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./src/modules/tabs.js":
/*!*****************************!*\
  !*** ./src/modules/tabs.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/*jshint esversion: 9*/

function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass){
    //Tabs
    const tabs = document.querySelectorAll(tabsSelector),
          tabsContent = document.querySelectorAll(tabsContentSelector),
          tabsParent = document.querySelector(tabsParentSelector);
    console.log(tabsParent);

    function hideTabContent() {
        tabsContent.forEach( (item) => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
        
        tabs.forEach( item => {
            item.classList.remove(activeClass);
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

        if(target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach( (item, i) => {
                if(target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);      //?????????????? ??-?????? tabs

/***/ }),

/***/ "./src/modules/timer.js":
/*!******************************!*\
  !*** ./src/modules/timer.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/*jshint esversion: 6*/

function timer(){
    //Timer
    const deadline = '2022-11-18';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()), //???????????????????? ?????????????????????? ???? deadline
              days = Math.floor(t / (1000 * 60 * 60 * 24)),  //??????-???? ?????????? ???????????????????? ???? deadline, ?? ?????????????? ??????-???? ????????????????. ?? ????????????
            //   hours =Math.floor(((t / (1000 * 60 * 60 * 24)) - days) * 24),
              hours = Math.floor((t / (1000 * 60 * 60) % 24)),  //???? ???????????? ??????-???? ?????????? ?????????? ?????????????? ???? ?????????????? ???? 24
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

    function getZero(num) {             //?????????????????? 0 ???????? < 10
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

              updateClock();  //?????????????????? ?????????? ?????? ???????? ???????? ???????????????? ?????????????? ?????????????? ???? ????????????????

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
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./src/services/services.js":
/*!**********************************!*\
  !*** ./src/services/services.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResource": () => (/* binding */ getResource),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
/*jshint esversion: 8 */
const postData = async (url, data) => {    //async ?????????????????? ???? ?????????????????????? ?????? ?? ??-??????
    const res = await fetch(url, {         //await ???????????????????????????????? ???????????????????? js ???? ???????????????????? ?????????????? ???? ????????????
        method: 'POST',
        headers: {'Content-type': 'application/json'},   //?????? ???????????????? formData headers ???? ??????????
        body: data
    });
    return await res.json();
};

//GET MENU DATA FROM SERVER
const getResource = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {                  //???????? ???????????? ?? ???????????????????? ??????????????
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    return await res.json();
};




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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_calculator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/calculator */ "./src/modules/calculator.js");
/* harmony import */ var _modules_cardsClasses__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/cardsClasses */ "./src/modules/cardsClasses.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/modal */ "./src/modules/modal.js");
/* harmony import */ var _modules_sendUsersForm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/sendUsersForm */ "./src/modules/sendUsersForm.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/slider */ "./src/modules/slider.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/tabs */ "./src/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/timer */ "./src/modules/timer.js");
/*jshint esversion: 8*/
 










document.addEventListener('DOMContentLoaded', () => {

//     const calculator = require('./modules/calculator'),
//           cardsClasses = require('./modules/cardsClasses'),
//           modal = require('./modules/modal'),
//           sendUsersForm = require('./modules/sendUsersForm'),
//           slider = require('./modules/slider'),
//           tabs = require('./modules/tabs'),
//           timer = require('./modules/timer');
const modalTimer = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_2__.openModal)('.modal', modalTimer), 30000);    //show modal in 30 sec

    (0,_modules_calculator__WEBPACK_IMPORTED_MODULE_0__["default"])();
    (0,_modules_cardsClasses__WEBPACK_IMPORTED_MODULE_1__["default"])();
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_2__["default"])('[data-modal]', '.modal', modalTimer);
    (0,_modules_sendUsersForm__WEBPACK_IMPORTED_MODULE_3__["default"])('form', modalTimer);
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_4__["default"])({
        container: '.offer__slider',
        slide: '.offer__slide',
        prevArrow: '.offer__slider-prev',
        nextArrow: '.offer__slider-next',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_5__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_6__["default"])();

 });
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map