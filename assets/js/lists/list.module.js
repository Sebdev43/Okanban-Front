import { addEventsToList, hideModals } from '../utils.module.js';
import { getListsFromAPI, createList, updateList } from './api.lists.module.js';
import { makeCardInDOM } from '../cards/card.module.js';

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

    addListForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        // On doit créer une liste ici, la requête doit nous retourner une liste

        const data = Object.fromEntries(new FormData(event.target));
        const list = await createList(data);

        makeListInDOM(list);

        event.target.reset();
    });
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
}

function showEditListForm(event) {
    // * On doit masquer le titre
    // * Quand on utilise les events, l'élément qui a déclenché l'event est : event.target ou event.currentTarget
    const titleElement = event.target;

    // Dans l'énoncé, on nous demande de cacher le titre
    // * titleElement.classList.add('is-hidden');
    // * On doit afficher le form
    const form = titleElement.nextElementSibling;
    form.classList.remove('is-hidden');
    // * On doit assigner au formulaire l'ID de la liste
    const listId = titleElement.closest('.panel').getAttribute('data-list-id');
    form.querySelector('input[type=hidden]').value = listId;
}

async function editList(event) {
    // * on empêche le formulaire de recharger la page
    event.preventDefault();
    // * On récupère le formulaire
    const form = event.target;
    // * On créé un formData avec le form, on pourrait sélectionner les inputs à la main
    const data = new FormData(form);
    // * On fabrique un objet que notre API comprendra

    const dataObj = {
        // * la méthode .get est issue de l'objet formData; elle permet de récupérer les valeurs des entrées de formData
        title: data.get('title'),
    };

    // * On attend la réponse de la BDD
    const newList = await updateList(data.get('list-id'), dataObj);

    // * On récupère le h2 qui est l'élément qui précède la form sur le DOM
    const titleElement = form.previousElementSibling;
    // * On met le à jour le texte du titre
    titleElement.textContent = newList.title;
    // * on réaffiche le titre
    titleElement.classList.remove('is-hidden');
    // * On cache le form et on vide les inputs
    form.classList.add('is-hidden');
    form.reset();
}

export {
    handleAddListForm,
    showAddListModal,
    showEditListForm,
    editList,
    getLists,
};
