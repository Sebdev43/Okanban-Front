// * Quand on importe avec ESM : on doit préciser l'extension du fichier
import { addListenerToActions } from './utils.module.js';
import { getLists } from './lists/list.module.js';
import { getToken } from './api.module.js';

function init() {
    getToken();
    getLists();
    addListenerToActions();
}

// on accroche un écouteur d'évènement sur le document : quand le chargement est terminé, on lance app.init
document.addEventListener('DOMContentLoaded', init);
