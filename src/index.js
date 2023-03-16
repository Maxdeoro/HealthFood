/*jshint esversion: 8*/
 "use strict";

 import 'polyfill-nodelist-foreach';

import calculator from './modules/calculator';
import cardsClasses from './modules/cardsClasses';
import modal from './modules/modal';
import sendUsersForm from './modules/sendUsersForm';
import slider from './modules/slider';
import tabs from './modules/tabs';
import timer from './modules/timer';
import { openModal } from './modules/modal';

document.addEventListener('DOMContentLoaded', () => {

//     const calculator = require('./modules/calculator'),
//           cardsClasses = require('./modules/cardsClasses'),
//           modal = require('./modules/modal'),
//           sendUsersForm = require('./modules/sendUsersForm'),
//           slider = require('./modules/slider'),
//           tabs = require('./modules/tabs'),
//           timer = require('./modules/timer');
const modalTimer = setTimeout(() => openModal('.modal', modalTimer), 30000);    //show modal in 30 sec

    calculator();
    cardsClasses();
    modal('[data-modal]', '.modal', modalTimer);
    sendUsersForm('form', modalTimer);
    slider({
        container: '.offer__slider',
        slide: '.offer__slide',
        prevArrow: '.offer__slider-prev',
        nextArrow: '.offer__slider-next',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    timer('.timer', '2023-05-04');

 });