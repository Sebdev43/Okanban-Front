import { handleAddListForm, showAddListModal } from './list.module.js';
import { showAddCardModal, handleAddCardForm } from './card.module.js';

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
    const addCardBtns = document.querySelectorAll('.panel a.is-pulled-right');
    for (const btn of addCardBtns) {
        btn.addEventListener('click', showAddCardModal);
    }

    handleAddListForm();
    handleAddCardForm();
}

// gérer avec un event.target
function hideModals() {
    document.getElementById('addListModal').classList.remove('is-active');
    document.getElementById('addCardModal').classList.remove('is-active');
}

export { addListenerToActions, hideModals };
