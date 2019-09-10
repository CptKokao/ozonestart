'use strict';

import getData from './modules/getData';
import renderCards from './modules/renderCards';
import filterText from './modules/filterText';
import catalog from './modules/catalog';
import toogleCheckbox from './modules/toogleCheckbox';
import toogleCart from './modules/toogleCart';
import addCart from './modules/addCart';


getData().then(data => {
    renderCards (data);
    filterText();
    catalog();
    toogleCheckbox();
    toogleCart();
    addCart();
});

console.log();