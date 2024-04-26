import { hideModals } from './utils.module.js';

function showAddCardModal(event) {
    document.getElementById('addCardModal').classList.add('is-active');

    const listContainer = event.target.closest('.panel');
    // * On récupère l'attribut data-list-id d'une liste pour l'ajouter au formulaire de création de carte
    // console.log(listContainer.getAttribute('data-list-id'));
    const listId = listContainer.dataset.listId;

    const addCardForm = document.querySelector('#addCardModal form');

    addCardForm.querySelector('input[type=hidden]').value = listId;
}

function handleAddCardForm() {
    const addListForm = document.querySelector('#addCardModal form');

    addListForm.addEventListener('submit', makeCardInDOM);
}

function makeCardInDOM(event) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target));
    createCardInDOM(data, document.querySelector(`[data-list-id="${data.list_id}"] .panel-block`));
    event.target.reset();
}
function createCardInDOM(card, container) {
    const cardTemplate = document.getElementById('card-template').content.cloneNode(true);
    cardTemplate.querySelector('[slot=card-title]').textContent = card.content;  
    cardTemplate.querySelector('.box').setAttribute('data-card-id', card.id);  
    cardTemplate.querySelector('.box').style.backgroundColor = card.color;  
    container.appendChild(cardTemplate);
    hideModals();
}

export { showAddCardModal, makeCardInDOM, handleAddCardForm, createCardInDOM };
