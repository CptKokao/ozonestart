export default function filter () {
    const cards = document.querySelectorAll('.goods .card');
    const activeLi = document.querySelector('.catalog-list li.active');
    const checkbox = document.querySelector('#discount-checkbox');
    const min = document.querySelector('#min');
    const max = document.querySelector('#max');

    checkbox.addEventListener('click', filter);
    min.addEventListener('change', filter);
    max.addEventListener('change', filter);

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