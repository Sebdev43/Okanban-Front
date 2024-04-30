// * Quand on importe avec ESM : on doit préciser l'extension du fichier
import { addListenerToActions } from './utils.module.js';
import { getLists } from './lists/list.module.js';
import { getToken } from './api.module.js';
import { setupCardDragAndDrop, setupDragAndDrop } from './Sortablejs.module.js';



async function init() {
    console.log('ini');
    await getToken();
    await getLists();
    
    addListenerToActions();
    setupDragAndDrop();
    setupCardDragAndDrop();
    console.log('finished');
}


// on accroche un écouteur d'évènement sur le document : quand le chargement est terminé, on lance app.init
document.addEventListener('DOMContentLoaded', init);
