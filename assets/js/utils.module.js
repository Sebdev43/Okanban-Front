import {
    handleAddListForm,
    showAddListModal,
    showEditListForm,
    editList,
    
} from './lists/list.module.js';

import { showAddCardModal, handleAddCardForm } from './cards/card.module.js';

// * peut-être bouger cette function ailleurs
function addListenerToActions() {
    // AJOUT DE LISTES
    const addListBtn = document.getElementById('addListButton');
    addListBtn.addEventListener('click', showAddListModal);

    const closeListModalBtns = document.querySelectorAll('.close');
    closeListModalBtns.forEach((btn) => {
        btn.addEventListener('click', hideModals);
    });

    // AJOUT DE CARTES
    addEventsToList();
    handleAddListForm();
    handleAddCardForm();
}

// * On pourrait mettre le contenu de cette fonction dans le makeListInDom
// * Continuer la réflexion : est-ce que cette fonction ne devrait pas être refactoriser
function addEventsToList() {
    const addCardBtns = document.querySelectorAll('.panel a.is-pulled-right');
    for (const btn of addCardBtns) {
        btn.addEventListener('click', showAddCardModal);
    }

    const titles = document.querySelectorAll('.panel h2');
    for (const listTitle of titles) {
        // * Avec cette syntaxe, l'event est fourni directement par JS, on passe par référence, on ne met pas les parenthèses
        // * Warning : je suis pas sur du terme référence
        listTitle.addEventListener('dblclick', showEditListForm);

        // listTitle.addEventListener('dblclick', (event) => {
        //     showEditListForm(event);
        // });
    }
    const editListForms = document.querySelectorAll('.panel form.js-list-form');
    for (const form of editListForms) {
        form.addEventListener('submit', editList);
    }
}

// gérer avec un event.target
function hideModals() {
    document.getElementById('addListModal').classList.remove('is-active');
    document.getElementById('addCardModal').classList.remove('is-active');
}

export { addListenerToActions, hideModals, addEventsToList };
