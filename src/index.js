'use strict';

// чекбокс
function toogleCheckbox() {
    let checkbox = document.querySelector('#discount-checkbox');
    checkbox.addEventListener('change', function () {
        this.nextElementSibling.classList.toggle('checked');
    });
}

// корзина
function toogleCart() {
    const basket = document.querySelector('#cart');
    const modalCart = document.querySelector('.cart');
    const modalClose = document.querySelector('.cart-close');

    basket.addEventListener('click', () => {
        modalCart.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });

    modalClose.addEventListener('click', () => {
        modalCart.style.display = 'none';
        document.body.style.overflow = '';
    });
}


// карточки
function addCart() {
    const cards = document.querySelectorAll('.goods .card');
    const cartEmpty = document.querySelector('#cart-empty');
    const counter = document.querySelector('.counter');
    const cartWrapper = document.querySelector('.cart-wrapper');
    
    cards.forEach((elem) => {
        const cardBtn = elem.querySelector('button');
        
    
        cardBtn.addEventListener('click', () => {
            const cardClone = elem.cloneNode(true);
            const removeBtn = cardClone.querySelector('button');
    
            cartWrapper.appendChild(cardClone);
            showData();
            removeBtn.textContent = 'Удалить из корзины';
    
            removeBtn.addEventListener('click', () => {
                cardClone.remove();
                showData();
            })
        });
    });

    
    // количество товаров в корзине
    function showData () {

        const cardsCart = cartWrapper.querySelectorAll('.card');
        const cardTotal = document.querySelector('.cart-total span');
        const cardsPrice = cartWrapper.querySelectorAll('.card-price');
        let sum = 0;
        counter.textContent = cardsCart.length;

        cardsPrice.forEach((elem) => {
            let price = parseFloat(elem.textContent);
            sum += price;
        });
        cardTotal.textContent = sum;

        if (cardsCart.length !== 0) {
            cartEmpty.remove();
        } else {
            cartWrapper.appendChild(cartEmpty);
        }
    };
};

// фильтр
function filterPage () {
    const checkbox = document.querySelector('#discount-checkbox');
    const cards = document.querySelectorAll('.goods .card');
    const min = document.querySelector('#min');
    const max = document.querySelector('#max');
    const searchInput = document.querySelector('.search-wrapper_input');
    const searchBtn = document.querySelector('.search-btn');

    // фильтр акции и цены
    function filter () {
        cards.forEach((elem) => {
            const cardPrice = elem.querySelector('.card-price');
            const price = parseFloat(cardPrice.textContent);

            if ((min.value && price < min.value) || (max.value && price > max.value)) {
                elem.parentNode.style.display = 'none';
            } else if (checkbox.checked && !elem.querySelector('.card-sale')){
                elem.parentNode.style.display = 'none';
            } else {
                elem.parentNode.style.display = '';
            }
        });
    };

    checkbox.addEventListener('click', filter);
    min.addEventListener('change', filter);
    max.addEventListener('change', filter);

    // фильтр по тексту
    function searchText () {
        const text = new RegExp(searchInput.value.trim(), 'i');
        cards.forEach((elem) => {
            const cardTitle = elem.querySelector('.card-title');
            if (!text.test(cardTitle.textContent)) {
                elem.parentNode.style.display = 'none';
            } else {
                elem.parentNode.style.display = '';
            }
        });
    }

    searchBtn.addEventListener('click', searchText);
};

function getData () {
    const goodsWrapper = document.querySelector('.goods');
    
    fetch('../db/db.json')
        .then((response) => {
            if(response.ok) {
                // получаем данные
                return response.json();
            } else {
                throw new Error ('Данные не были получены, ошибка: ' + response.status);
            }
        })
        .then(data => renderData(data))
        .catch(err => goodsWrapper.innerHTML = '<p>' + err + '</p>');
};

function renderData (data) {
    const goodsWrapper = document.querySelector('.goods');
    console.log(data.goods);
    data.goods.forEach((el) => {
        
        const div = document.createElement('div');
        div.className = 'col-12 col-md-6 col-lg-4 col-xl-3';
        div.innerHTML = `
                    <div class="card">
                        ${el.sale ? '<div class="card-sale">🔥Hot Sale🔥</div>' : ''}
                        <div class="card-img-wrapper">
                            <span class="card-img-top" style="background-image: url('${el.img}')"></span>
                        </div>
                        <div class="card-body justify-content-between">
                            <div class="card-price">${el.price} ₽</div>
                            <h5 class="card-title">${el.title}</h5>
                            <button class="btn btn-primary">В корзину</button>
                        </div>
                    </div>
        `;
        goodsWrapper.appendChild(div);
    });
}

getData();
toogleCheckbox();
toogleCart();
addCart();
filterPage();
console.log();