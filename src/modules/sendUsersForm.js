/*jshint esversion: 10*/

import {closeModal, openModal} from './modal';
import {postData} from '../services/services';

function sendUsersForm(formSelector, modalTimer){
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
        openModal('.modal', modalTimer);

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
            closeModal('.modal');
        }, 6000);
    }

    //to start json-server: npx json-server --watch db.json

    // fetch('db.json')
    fetch('http://localhost:3000/menu')
        .then(data => data.json())
        .then(res => console.log(res));
}

export default sendUsersForm;