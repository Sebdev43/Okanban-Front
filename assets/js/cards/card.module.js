import { hideModals } from '../utils.module.js';
import { createCard, update, destroy } from './api.cards.module.js';

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

    addListForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const data = Object.fromEntries(new FormData(event.target));
        const card = await createCard(data);

        makeCardInDOM(card);
        event.target.reset();
    });
}

function makeCardInDOM(data) {
    const cardTemplate = document.getElementById('card-template');
    // ! On précise true pour obtenir tout ce qui est contenu dans le template
    const clone = document.importNode(cardTemplate.content, true);

    clone.querySelector('[slot=card-title]').textContent = data.content;
    const card = clone.querySelector('.box');
    card.setAttribute('data-card-id', data.id);

    const cardForm = card.querySelector('form.js-card-form');
    cardForm.addEventListener('submit', updateCard);

    const links = card.querySelectorAll('a');
    // * QuerySelectorAll retourne un nodelist : on prend le premier pour éditer et le second pour effacer
    const editBtn = links[0];
    editBtn.addEventListener('click', editCard);
    const deleteBtn = links[1];
    deleteBtn.addEventListener('click', deleteCard);

    /* On doit sélectionne la liste correcte pour ajouter notre carte sur la DOM */
    // On a l'info data.listId qui correspond à une liste sur le DOM

    const theGoodList = document.querySelector(
        `[data-list-id="${data.list_id}"]`
    );

    // On doit ajouter un event listener après avoir créer la carte

    theGoodList.querySelector('.panel-block').appendChild(clone);

    hideModals();
}

function editCard(event) {
    const btn = event.target;
    const card = btn.closest('.box');
    const cardText = card.querySelector('.column');
    const cardform = card.querySelector('form');
    cardform.querySelector('input[type=hidden]').value =
        card.getAttribute('data-card-id');
    cardText.classList.add('is-hidden');
    cardform.classList.remove('is-hidden');
}

async function updateCard(event) {
    event.preventDefault();

    const form = event.target;

    const data = Object.fromEntries(new FormData(form));

    const updatedCard = await update(data['card-id'], data);

    form.classList.add('is-hidden');
    const contentElem = form.previousElementSibling;
    contentElem.textContent = updatedCard.content;
    contentElem.classList.remove('is-hidden');
    form.reset();
}

async function deleteCard(event) {
    const btn = event.target;
    const card = btn.closest('.box');
    const cardId = card.getAttribute('data-card-id');
    await destroy(cardId);

    card.remove();
}

export { showAddCardModal, makeCardInDOM, handleAddCardForm };
