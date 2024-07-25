import { hideModals } from './utils.module.js';

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

//     addListForm.addEventListener('submit', makeCardInDOM);
// }




function makeCardInDOM(event) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target));
    const container = document.querySelector(`[data-list-id="${data.list_id}"] .panel-block`);
    if (!container) {
        console.error('Container not found for list_id:', data.list_id);
        return;
    }
    createCardInDOM(data, container);
    event.target.reset();
}

function createCardInDOM(card, container) {
    if (!container) {
        console.error('Container not found for list_id:', card.list_id);
        return; 
    }

    const cardTemplate = document.getElementById('card-template').content.cloneNode(true);
    cardTemplate.querySelector('[slot="card-title"]').textContent = card.content;
    cardTemplate.querySelector('.box').setAttribute('data-card-id', card.id);
    cardTemplate.querySelector('.box').style.backgroundColor = card.color;
    container.appendChild(cardTemplate); 
    hideModals();
}

async function handleAddCardForm(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const json = Object.fromEntries(formData.entries());

    try {
        const response = await fetch('http://localhost:3000/cards', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json),
        });

        if (!response.ok) {
            throw new Error(`Failed to create card with status: ${response.status}`);
        }

        const card = await response.json();
        const container = document.querySelector(`[data-list-id="${card.list_id}"] .panel-block`);
        if (!container) {
            throw new Error(`Container for list_id ${card.list_id} not found`);
        }
        createCardInDOM(card, container);
        hideModals();
        event.target.reset();
    } catch (error) {
        console.error("Erreur lors de l'ajout de la carte: ", error);
        alert("Erreur lors de l'ajout de la carte : " + error.message);
    }
}





export { showAddCardModal, makeCardInDOM, handleAddCardForm, createCardInDOM };
