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

function makeCardInDOM(data) {
    // event.preventDefault();

    // const data = Object.fromEntries(new FormData(event.target));

    const cardTemplate = document.getElementById('card-template');
    // ! On précise true pour obtenir tout ce qui est contenu dans le template
    const clone = document.importNode(cardTemplate.content, true);

    clone.querySelector('[slot=card-title]').textContent = data.content;

    /* On doit sélectionne la liste correcte pour ajouter notre carte sur la DOM */
    // On a l'info data.listId qui correspond à une liste sur le DOM

    console.log(data.list_id);

    const theGoodList = document.querySelector(
        `[data-list-id="${data.list_id}"]`
    );

    // On doit ajouter un event listener après avoir créer la carte

    theGoodList.querySelector('.panel-block').appendChild(clone);

    // * temp comment
    // hideModals();
    // event.target.reset();
}
export { showAddCardModal, makeCardInDOM, handleAddCardForm };
