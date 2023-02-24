/*jshint esversion: 8 */
const postData = async (url, data) => {    //async указывает на асинхронный код в ф-ции
    const res = await fetch(url, {         //await приостанавливает выполнение js до завершения запроса на сервер
        method: 'POST',
        headers: {'Content-type': 'application/json'},   //при отправке formData headers не нужен
        body: data
    });
    return await res.json();
};

//GET MENU DATA FROM SERVER
const getResource = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {                  //если ошибка в результате запроса
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    return await res.json();
};

export {postData};
export {getResource};