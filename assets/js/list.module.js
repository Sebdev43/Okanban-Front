import { addEventsToList, hideModals } from './utils.module.js';
import { createCardInDOM } from './card.module.js';

function handleAddListForm() {
    const addListForm = document.querySelector('#addListModal form');

    addListForm.addEventListener('submit', makeListInDOM);
}

function showAddListModal() {
    document.getElementById('addListModal').classList.add('is-active');
}

function makeListInDOM(event) {
    event.preventDefault();

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

    const data = Object.fromEntries(new FormData(event.target));

    const listTemplate = document.getElementById('list-template');
    // ! On précise true pour obtenir tout ce qui est contenu dans le template
    const clone = document.importNode(listTemplate.content, true);

    clone.querySelector('[slot="title"]').textContent = data.title;

    const d = clone.querySelector('.panel');
    d.setAttribute('data-list-id', Date.now());

    document.querySelector('.card-lists').appendChild(clone);

    // ! On doit ajouter un event listener après avoir créer la liste
    addEventsToList();
    hideModals();
    event.target.reset();
}
function createListInDOM(list) {
    console.log("Données de la liste récupérée:", list);  

    const listTemplate = document.getElementById('list-template').content.cloneNode(true);
    listTemplate.querySelector('[slot="title"]').textContent = list.title;  

    listTemplate.querySelector('.panel').setAttribute('data-list-id', list.id);

    const cardContainer = listTemplate.querySelector('.panel-block');
    // Vérifie si la liste contient des cartes et les ajoute
    if (list.cards && Array.isArray(list.cards)) {
        list.cards.forEach(card => {
            createCardInDOM(card, cardContainer);  
        });
    }

    document.querySelector('.card-lists').appendChild(listTemplate);
}




export { handleAddListForm, showAddListModal, createListInDOM };
