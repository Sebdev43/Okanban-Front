import { addEventsToList, hideModals } from './utils.module.js';
import { getListsFromAPI } from './api.module.js';
import { makeCardInDOM } from './card.module.js';

async function getLists() {
    const data = await getListsFromAPI();

    for (const list of data) {
        makeListInDOM(list);

        for (const card of list.cards) {
            makeCardInDOM(card);
        }
    }
}

function handleAddListForm() {
    const addListForm = document.querySelector('#addListModal form');

    addListForm.addEventListener('submit', makeListInDOM);
}

function showAddListModal() {
    document.getElementById('addListModal').classList.add('is-active');
}

function makeListInDOM(data) {
    // event.preventDefault();

    // * Le constructeur FormData prend en argument un objet Form ou rien
    // * Quand on lui passe un arg, il se débrouiller pour parser les valeurs du formulaire et nous retourne une instance de FormData

    // const formData = new FormData(event.target);
    // formData.set('title', 'un titre ajouté à la main');
    // formData.append('toto', 'un toto ajouté à la main');
    // formData : entries retourne un itérateur
    // console.log(formData.entries());
    // const entries = formData.entries();
    // console.log(entries);
    // console.log(formData.get('title'));
    // for (const entry of formData.entries()) {
    //     console.log(entry);
    // }

    // * temp comment
    // const data = Object.fromEntries(new FormData(event.target));

    const listTemplate = document.getElementById('list-template');
    // ! On précise true pour obtenir tout ce qui est contenu dans le template
    const clone = document.importNode(listTemplate.content, true);

    clone.querySelector('[slot="title"]').textContent = data.title;

    // ! ajoute un attribut data-list-id sur la liste, ce qui nous permet d'identifier une liste avec l'information contenue dans une carte (list_id)
    clone.querySelector('.panel').setAttribute('data-list-id', data.id);

    document.querySelector('.card-lists').appendChild(clone);

    // ! On doit ajouter un event listener après avoir créer la liste
    addEventsToList();
    hideModals();
    // *
    // * temp comment
    // event.target.reset();
}

export { handleAddListForm, showAddListModal, getLists };
