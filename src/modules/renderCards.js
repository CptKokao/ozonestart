export default function renderCards (data) {
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