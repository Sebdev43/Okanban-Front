import { addEventsToList, hideModals } from './utils.module.js';
import { getListsFromAPI, createList, updateList, deleteList } from './api.module.js';
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
    const form = clone.querySelector('form');
    form.dataset.listId = data.id;
    form.querySelector('input[name="list-id"]').value = data.id;

    document.querySelector('.card-lists').appendChild(clone);

    // ! On doit ajouter un event listener après avoir créer la liste
    
    event.target.reset();
} */




function createListInDOM(list) {
    console.log("Adding list to DOM:", list);

    const listTemplate = document.getElementById('list-template').content.cloneNode(true);
    listTemplate.querySelector('[slot="title"]').textContent = list.title;
    listTemplate.querySelector('.panel').setAttribute('data-list-id', list.id);

    const cardContainer = listTemplate.querySelector('.panel-block');
    if (list.cards && Array.isArray(list.cards)) {
        list.cards.forEach(card => {
            createCardInDOM(card, cardContainer);
        });
    }

    const listsContainer = document.querySelector('.card-lists');
    if (!listsContainer) {
        console.error("List container not found!");
        return;
    }

    listsContainer.appendChild(listTemplate);
    console.log("List added to DOM:", listTemplate);
    addEventsToList();
    hideModals();
    // *
}

function setupListEditing() {
    const listContainer = document.querySelector('.card-lists');

    listContainer.addEventListener('dblclick', function(event) {
        if (event.target.tagName === 'H2' && event.target.classList.contains('has-text-white')) {
            const h2 = event.target;
            const editForm = h2.nextElementSibling;
            const listId = editForm.dataset.listId; // Récupération de l'ID de la liste depuis les données de l'élément form
            h2.classList.add('is-hidden');
            editForm.classList.remove('is-hidden');
            editForm.elements['list-name'].value = h2.textContent;
            editForm.elements['list-id'].value = listId; // Définition de la valeur de l'input list-id avec l'identifiant de la liste
        }
    });

    listContainer.addEventListener('submit', async function(event) {
        if (event.target.tagName === 'FORM' && !event.target.classList.contains('is-hidden')) {
            event.preventDefault();
            const form = event.target;
            const title = form.elements['list-name'].value;
            const listId = form.elements['list-id'].value; // Récupération de l'ID de la liste depuis l'input caché
            try {
                const updatedList = await updateList(listId, { title }); // Appel de la méthode updateList
                if (updatedList) {
                    const h2 = form.previousElementSibling;
                    h2.textContent = title;
                    h2.classList.remove('is-hidden');
                    form.classList.add('is-hidden');
                } else {
                    throw new Error('Erreur lors de la mise à jour de la liste');
                }
            } catch (error) {
                console.error('Erreur lors de la mise à jour de la liste:', error);
                alert('Erreur lors de la mise à jour de la liste');
            }
        }
    });
}
function setupListDeletion() {
    console.log('La fonction setupCardDeletion() est appelée.');

    const listContainers = document.querySelector('.columns');
    console.log('cardContainers:', listContainers);

    cardContainers.addEventListener('click', async function(event) {
        console.log("Un clic a été détecté");
        event.preventDefault();
        
        const deleteIcon = event.target.closest('.delete-list');
        console.log("deleteIcon:", deleteIcon);

        if (deleteIcon) {
            const listContainer = deleteIcon.closest('.box');
            const confirmation = confirm("Êtes-vous sûr de vouloir supprimer cette liste ?");
            if (confirmation) {
                const listId = listContainer.dataset.cardId;
                deleteList(listId); // Appeler la fonction pour supprimer la carte
                listContainer.remove(); // Supprimer l'élément de la carte de l'interface utilisateur
            }
        }
    });
}






export { handleAddListForm, showAddListModal, getLists, setupListEditing, setupListDeletion };
