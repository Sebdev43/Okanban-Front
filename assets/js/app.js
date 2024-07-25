// * Quand on importe avec ESM : on doit préciser l'extension du fichier
import { addListenerToActions } from './utils.module.js';
import { getLists, setupListEditing, setupListDeletion } from './list.module.js';
import { getToken } from './api.module.js';
import { setupCardEditing, setupCardDeletion } from './card.module.js';


function init() {
    console.log('Init function started');
    getToken();
    getLists();
    addListenerToActions();
    setupListEditing();
    setupCardEditing();
    setupCardDeletion();
    setupCardDeletion();
    console.log('Init function completed');
}


// Attacher l'initialisation au chargement du DOM
document.addEventListener('DOMContentLoaded', () => app.init());
