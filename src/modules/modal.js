/*jshint esversion: 8*/

function openModal(modalSelector, modalTimer) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';  //отключает прокрутку страницы вниз

    console.log(modalTimer);
    if (modalTimer) {
    clearInterval(modalTimer);    //предотвращает автооткрытие окна после открытия окна пользователем
    }
}
function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';    //включает прокрутку страницы
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

    modal.addEventListener('click', (e) => {         //закрывает окно при клике на подложку
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
            window.removeEventListener('scroll', showModalByScroll);  //предотвращает повторное открытие modal
        }  //условие означает что страница проскроллена до низа и открывается modal
    }

    window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export {closeModal};
export {openModal};