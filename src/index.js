'use strict';

// чекбокс

let checkbox = document.querySelector('#discount-checkbox');
checkbox.addEventListener('change', function () {
    this.nextElementSibling.classList.toggle('checked');
})
console.log();

// корзина
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

// карточки
const cards = document.querySelectorAll('.goods .card');
const cartWrapper = document.querySelector('.cart-wrapper');
const cartEmpty = document.querySelector('#cart-empty');
const counter = document.querySelector('.counter');

cards.forEach((elem) => {
    const cardBtn = elem.querySelector('button');

    cardBtn.addEventListener('click', () => {
        const cardClone = elem.cloneNode(true);
        cartWrapper.appendChild(cardClone);
        cartEmpty.remove();
        showData();
    });
});

// количество товаров в корзине

function showData () {
    const cardsCart = cartWrapper.querySelectorAll('.card');
    counter.textContent = cardsCart.length;
}