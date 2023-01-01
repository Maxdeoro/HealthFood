"use strict";
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
    
        modalCloseBtn.addEventListener('click', closeModal);
    
        modal.addEventListener('click', (e) => {         //закрывает окно при клике на подложку
            if(e.target === modal && e.target !== modalDialog) {
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
    
    
    //Timer
        const deadline = '2022-10-20';
    
        function getTimeRemaining(endtime) {
            const t = Date.parse(endtime) - Date.parse(new Date()), //количество миллисекунд до deadline
                  days = Math.floor(t / (1000 * 60 * 60 * 24)),  //кол-во суток оставшихся до deadline, в скобках кол-во миллисек. в сутках
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
    
    });