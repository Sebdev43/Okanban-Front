import { hideModals } from '../utils.module.js';
import { createCard, update, destroy, associateTagWithCard, removeTagFromCard } from './api.cards.module.js';
import { config } from '../config.module.js';

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
    const clone = document.importNode(cardTemplate.content, true);

    clone.querySelector('[slot=card-title]').textContent = data.content;
    const card = clone.querySelector('.box');
    card.setAttribute('data-card-id', data.id);

    const tagsContainer = clone.querySelector('.tags-container');

    // Vérifiez si data.tags est défini et est un tableau avant de l'utiliser
    if (Array.isArray(data.tags)) {
        data.tags.forEach(tag => {
            const tagElement = document.createElement('span');
            tagElement.classList.add('tag');
            tagElement.textContent = tag.name;
            tagElement.style.backgroundColor = tag.color;
            tagElement.setAttribute('data-tag-id', tag.id);
            tagElement.addEventListener('dblclick', () => handleTagRemoval(data.id, tag.id));
            tagsContainer.appendChild(tagElement);
        });
    } else {
        console.log('Aucun tag à afficher pour cette carte.');
    }

    const cardForm = card.querySelector('form.js-card-form');
    cardForm.addEventListener('submit', updateCard);

    const links = card.querySelectorAll('a');
    const editBtn = links[0];
    editBtn.addEventListener('click', editCard);
    const deleteBtn = links[1];
    deleteBtn.addEventListener('click', deleteCard);

    const theGoodList = document.querySelector(`[data-list-id="${data.list_id}"]`);
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

    const cardId = parseInt(data['card-id']);
    const selectedTagId = parseInt(data['selected-tag']);

    try {
        
        const response = await fetch(`${config.base_url}/cards/${cardId}`, { method: 'HEAD' });
        const cardExists = response.ok;

        if (!cardExists) {
            
            const newData = {
                content: data['content'], 
                listId: data['list-id'] 
            };
            const newCard = await update(newData);
            makeCardInDOM(newCard); 
        }

        
        const tagAssociation = await associateTagWithCard(cardId, selectedTagId);
        console.log("Tag associé avec succès", tagAssociation);

        
        form.classList.add('is-hidden');
        const cardBox = form.closest('.box'); 
        const cardTitleDiv = cardBox.querySelector('[slot="card-title"]');
        cardTitleDiv.classList.remove('is-hidden');
        
        form.reset();

       
        alert("Carte mise à jour avec succès !");
    } catch (error) {
        console.error(error);
        alert("Erreur lors de la mise à jour de la carte : " + error.message);
    }
}




async function deleteCard(event) {
    const btn = event.target;
    const card = btn.closest('.box');
    const cardId = card.getAttribute('data-card-id');
    await destroy(cardId);

    card.remove();
}

function handleTagRemoval(cardId, tagId) {
    removeTagFromCard(cardId, tagId).then(sucess => {
        if (sucess) {
            document.querySelector(`[data-tag-id="${tagId}"]`).remove();
            console.log('Tag removed form DOM successfully');
        } else {
            console.log('Failed to remove tag from DOM');
        }
    });
}


export { showAddCardModal, makeCardInDOM, handleAddCardForm };
