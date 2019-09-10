export default function getData () {
    const goodsWrapper = document.querySelector('.goods');
    
    return fetch('../db/db.json')
        .then((response) => {
            if(response.ok) {
                // получаем данные
                return response.json();
            } else {
                throw new Error ('Данные не были получены, ошибка: ' + response.status);
            }
        })
        .then(data => {
            return data
        })
        .catch(err => {
            goodsWrapper.innerHTML = '<p>' + err + '</p>';
        })
};