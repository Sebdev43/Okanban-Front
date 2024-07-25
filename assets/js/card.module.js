import { hideModals } from './utils.module.js';
import { createCard, updateCard, deleteCard } from './api.module.js';

function showAddCardModal(event) {
    console.log("Modal should open now");
    
    document.getElementById('addCardModal').classList.add('is-active');

    const listContainer = event.target.closest('.panel');
    if (!listContainer) {
        console.error("No panel found");
        return;
    }
    // * On récupère l'attribut data-list-id d'une liste pour l'ajouter au formulaire de création de carte
    // console.log(listContainer.getAttribute('data-list-id'));
    const listId = listContainer.dataset.listId;

    const addCardForm = document.querySelector('#addCardModal form');

    addCardForm.querySelector('input[type=hidden]').value = listId;
}

// function handleAddCardForm() {
//     const addListForm = document.querySelector('#addCardModal form');

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
    const clone = document.importNode(cardTemplate.content, true);

    clone.querySelector('[slot=card-title]').textContent = data.content;

    const cardElement = clone.querySelector('.box');
    cardElement.setAttribute('data-card-id', data.id); // Attribution de l'ID de la carte au bon endroit dans le template

    const theGoodList = document.querySelector(`[data-list-id="${data.list_id}"]`);

    // Vérification de l'existence de la liste correspondante dans le DOM
    if (theGoodList) {
        theGoodList.querySelector('.panel-block').appendChild(clone);
    } else {
        console.error(`La liste avec l'ID ${data.list_id} n'existe pas dans le DOM.`);
    }

    hideModals();
}

function setupCardEditing() {
    console.log("La fonction setupCardEditing() est appelée.");

    const cardContainer = document.querySelector('.card-lists');
    console.log("cardContainer:", cardContainer);

    cardContainer.addEventListener('click', async function(event) {
        console.log("Un clic a été détecté.");

        const pencilIcon = event.target.closest('.fa-pencil-alt');
        console.log("pencilIcon:", pencilIcon);

        if (pencilIcon) {
            console.log("L'icône du crayon a été cliquée.");
            event.preventDefault();

            const cardTitle = pencilIcon.closest('.box').querySelector('[slot=card-title]');
            console.log("cardTitle:", cardTitle);

            const editForm = cardTitle.closest('.box').querySelector('.edit-card-form');
            console.log("editForm:", editForm);

            console.log("editForm classList before:", editForm.classList);
            cardTitle.classList.add('is-hidden');
            editForm.classList.remove('is-hidden');
            editForm.querySelector('[name="card-name"]').value = cardTitle.textContent;
            console.log("editForm classList after:", editForm.classList);
        }
    });

    cardContainer.addEventListener('submit', async function(event) {
        event.preventDefault();

        const form = event.target;
        const cardTitle = form.previousElementSibling;
        const newContent = form.elements['card-name'].value; // Modifier pour récupérer le contenu du champ 'card-name'
        const cardId = form.closest('.box').dataset.cardId;

        try {
            await updateCard(cardId, { content: newContent }); // Mettre à jour le champ 'content'

            cardTitle.textContent = newContent; // Mettre à jour le titre avec le nouveau contenu

            form.classList.add('is-hidden');
            cardTitle.classList.remove('is-hidden');
        } catch (error) {
            console.error('Erreur lors de la mise à jour du contenu de la carte:', error);
            alert('Erreur lors de la mise à jour du contenu de la carte');
        }
    });
}
function setupCardDeletion() {
    console.log('La fonction setupCardDeletion() est appelée.');

    const cardContainers = document.querySelector('.box');
    console.log('cardContainers:', cardContainers);

    cardContainers.addEventListener('click', async function(event) {
        console.log("Un clic a été détecté");
        event.preventDefault();
        
        const deleteIcon = event.target.closest('.fa-trash-alt');
        console.log("deleteIcon:", deleteIcon);

        if (deleteIcon) {
            const cardContainer = deleteIcon.closest('.box');
            const confirmation = confirm("Êtes-vous sûr de vouloir supprimer cette carte ?");
            if (confirmation) {
                const cardId = cardContainer.dataset.cardId;
                deleteCard(cardId); // Appeler la fonction pour supprimer la carte
                cardContainer.remove(); // Supprimer l'élément de la carte de l'interface utilisateur
            }
        }
    });
}






export { showAddCardModal, makeCardInDOM, handleAddCardForm, setupCardEditing, setupCardDeletion };
