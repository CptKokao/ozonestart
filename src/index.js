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

function filter () {
    const checkbox = document.querySelector('#discount-checkbox');
    const cards = document.querySelectorAll('.goods .card');
    const min = document.querySelector('#min');
    const max = document.querySelector('#max');
    const searchInput = document.querySelector('.search-wrapper_input');
    const searchBtn = document.querySelector('.search-btn');

    // фильтр акции
    function filterSale () {
        cards.forEach((elem) => {
            if (checkbox.checked){
                if (!elem.querySelector('.card-sale')) {
                    elem.parentNode.style.display = 'none';
                }
            } else {
                elem.parentNode.style.display = '';
            }
        });
    };

    checkbox.addEventListener('click', filterSale);

    // фильтр цены 
    function filterPrice () {
        cards.forEach((elem) => {
            const cardPrice = elem.querySelector('.card-price');
            const price = parseFloat(cardPrice.textContent);
            console.log(price);
            if ((min.value && price < min.value) || (max.value && price > max.value)) {
                elem.parentNode.style.display = 'none';
            } else {
                elem.parentNode.style.display = '';
            }
        });
    };
    
    min.addEventListener('change', filterPrice);
    max.addEventListener('change', filterPrice);

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


toogleCheckbox();
toogleCart();
addCart();
filter();
console.log();