export default function addCart() {
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