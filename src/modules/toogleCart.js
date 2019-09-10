export default function toogleCart() {
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