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
    
    cards.forEach((el) => {
        const cardBtn = el.querySelector('button');
        
    
        cardBtn.addEventListener('click', () => {
            const cardClone = el.cloneNode(true);
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

        cardsPrice.forEach((el) => {
            let price = parseFloat(el.textContent);
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


    checkbox.addEventListener('click', filter);
    min.addEventListener('change', filter);
    max.addEventListener('change', filter);

    // фильтр по тексту
    function searchText () {
        const text = new RegExp(searchInput.value.trim(), 'i');
        cards.forEach((el) => {
            const cardTitle = el.querySelector('.card-title');
            if (!text.test(cardTitle.textContent)) {
                el.parentNode.style.display = 'none';
            } else {
                el.parentNode.style.display = '';
            }
        });
    }

    searchBtn.addEventListener('click', searchText);
};



// фильтр акции и цены
function filter () {
    const cards = document.querySelectorAll('.goods .card');
    const activeLi = document.querySelector('.catalog-list li.active');
    const checkbox = document.querySelector('#discount-checkbox');
    const min = document.querySelector('#min');
    const max = document.querySelector('#max');
    console.log(activeLi);

    cards.forEach((el) => {
        const cardPrice = el.querySelector('.card-price');
        const cardSale = el.querySelector('.card-sale');
        const price = parseFloat(cardPrice.textContent);

        el.parentNode.style.display = '';

        if ((min.value && price < min.value) || (max.value && price > max.value)) {
            el.parentNode.style.display = 'none';
        }  else if (checkbox.checked && !cardSale){
            el.parentNode.style.display = 'none';
        } else if (activeLi) {
            if (activeLi.textContent !== el.dataset.category) {
                el.parentNode.style.display = 'none';
            }
        }
        
    });
};

// получение данных
function getData () {
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

// отрисовка товаров
function renderData (data) {
    const goodsWrapper = document.querySelector('.goods');
    data.goods.forEach((el) => {
        
        const div = document.createElement('div');
        div.className = 'col-12 col-md-6 col-lg-4 col-xl-3';
        div.innerHTML = `
                    <div class="card" data-category="${el.category}">
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
};

// каталог
function catalog () {
    const cards = document.querySelectorAll('.goods .card');
    const categories = new Set();
    const catalog = document.querySelector('.catalog');
    const catalogBtn = document.querySelector('.catalog-button');
    const catalogList = document.querySelector('.catalog-list');
    const filterTitle = document.querySelector('.filter-title h5');

    cards.forEach((el) => {
        categories.add(el.dataset.category);
    });

    categories.forEach((el) => {
        const li = document.createElement('LI');
        li.textContent = el;
        catalogList.appendChild(li);
    });

    const allLi = catalogList.querySelectorAll('LI');

    catalogBtn.addEventListener('click', (evt) => {
        if (catalog.style.display) {
            catalog.style.display = '';
        } else {
            catalog.style.display = 'block';
        }
        
        if (evt.target.tagName === 'LI') {
            filterTitle.textContent = evt.target.textContent;
            allLi.forEach((el) => {
                if (evt.target === el) {
                    el.classList.add('active');
                } else {
                    el.classList.remove('active');
                }
            });
            filter();
        }
    });
}

getData().then(data => {
    renderData (data);
    filterPage();
    catalog();
    toogleCheckbox();
    toogleCart();
    addCart();
});

console.log();