// * Quand on importe avec ESM : on doit préciser l'extension du fichier
import { addListenerToActions } from './list.module.js';

function init() {
    addListenerToActions();
}

// on accroche un écouteur d'évènement sur le document : quand le chargement est terminé, on lance app.init
document.addEventListener('DOMContentLoaded', init);
