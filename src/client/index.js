import { addFlight } from './js/addFlight.js';
import { remove } from './js/addFlight.js';

import './styles/styles.scss';
document.querySelector("#submit").addEventListener("click", addFlight);
//change to to correct function names
export {
    addFlight, remove
};