import { addFlight } from './js/addFlight.js';
import { remove } from './js/addFlight.js';

import './styles/styles.scss';
document.addEventListener('DOMContentLoaded', (event) => {
    //event listeners here
    document.querySelector("#submit").addEventListener("click", addFlight);

});
//change to to correct function names
export {
    addFlight, remove
};