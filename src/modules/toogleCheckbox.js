export default function toogleCheckbox() {
    let checkbox = document.querySelector('#discount-checkbox');
    checkbox.addEventListener('change', function () {
        this.nextElementSibling.classList.toggle('checked');
    });
}