import { addEventsToList, hideModals } from './utils.module.js';
import { createCardInDOM } from './card.module.js';




// function handleAddListForm() {
//     const addListForm = document.querySelector('#addListModal form');

//     addListForm.addEventListener('submit', makeListInDOM);
// }

async function handleAddListForm(event) {
    event.preventDefault();
    console.log("Form submitted, processing data...");

    const formData = new FormData(event.target);
    const json = Object.fromEntries(formData.entries());
    console.log("Data to be sent:", json);

    try {
        console.log("Sending data to server...");
        const response = await fetch(`http://localhost:3000/lists`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json),
        });
        console.log("Response received:", response);

        if (!response.ok) {
            throw new Error(`HTTP error, status = ${response.status}`);
        }

        const list = await response.json();
        console.log("Data received from server:", list);

        console.log("Updating DOM with new list...");
        createListInDOM(list);
        console.log("DOM updated successfully.");

        hideModals();
        event.target.reset();
    } catch (error) {
        console.error("Error in list creation or invalid response:", error);
        alert("Erreur lors de l'ajout de la liste : " + error.message);
    }
}

function showAddListModal() {
    document.getElementById('addListModal').classList.add('is-active');
}

/* function makeListInDOM(event) {
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

    
}







export { handleAddListForm, showAddListModal, createListInDOM };
