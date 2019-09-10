export default function filterText () {
    const cards = document.querySelectorAll('.goods .card');
    const searchInput = document.querySelector('.search-wrapper_input');
    const searchBtn = document.querySelector('.search-btn');

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