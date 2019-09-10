import filter from './filter';

export default function catalog () {
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