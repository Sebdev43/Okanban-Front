import { config } from './config.module.js';

// * Les méthodes pour créer des listes et cartes cont très similaires, il faudrait envisager une ou plusieurs abstractions pour restser DRY

async function getListsFromAPI() {
    try {
        const response = await fetch(`${config.base_url}/lists`, {
            credentials: 'include',
            mode: 'cors',
        });
        // ! Notre API renvoie du json, donc on fait response.json, si l'API renvoyait du text on ferait `response.text()`, si l'API renvoyait du binaire on ferait `response.blob()`
        // throw response;
        if (!response.ok) {
            throw response;
        }

        const data = await response.json();
        console.log(data);
        return data;
        
    } catch (error) {
        console.log(error);
        // document.location.href = 'http://localhost:3000/error.html';
        // Faire une redirection ou retourner une message d'erreur
    }
}

async function getToken() {
    try {
        // * Ce premier fecth sert à mettre en place le csrf-token sur la session du serveur, et dans la balise meta du front
        // * Ce serait mieux de  ne pas avoir une route dédiée pour faire ce token (sur la route '/' ce serait l'idéal)
        const response = await fetch(`${config.base_url}/token`, {
            credentials: 'include',
        });

        if (!response.ok) {
            throw response;
        }

        const token = await response.json();

        document.head.querySelector('meta[name=csrf-token]').content = token;
    } catch (error) {
        console.log(error);
    }
}

async function createList(data) {
    try {
        const token = document.head.querySelector(
            'meta[name=csrf-token]'
        ).content;

        const response = await fetch(`${config.base_url}/lists`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                // * attention, quand on envoie du json, il faut pas oublier le header Content-Type
                'Content-Type': 'application/json',
                'x-csrf-token': token,
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw response;
        }

        const list = await response.json();

        return list;
    } catch (error) {
        console.log(error);
    }
}

async function createCard(data) {
    try {
        const token = document.head.querySelector(
            'meta[name=csrf-token]'
        ).content;

        const response = await fetch(`${config.base_url}/cards`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'x-csrf-token': token,
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw response;
        }

        const card = await response.json();

        return card;
    } catch (error) {
        console.log(error);
    }
}

async function updateList(listId, data) {
    try {
        const token = document.head.querySelector(
            'meta[name=csrf-token]'
        ).content;
        const response = await fetch(`${config.base_url}/lists/${listId}`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'x-csrf-token': token,
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error('Echec de la mise à jour de la liste');
        }

        return await response.json();
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la liste');
        return null;
    }
}


async function updateCard(cardId, newData) {
    try {
        const token = document.head.querySelector('meta[name=csrf-token]').content;

        const response = await fetch(`${config.base_url}/cards/${cardId}`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'x-csrf-token': token,
            },
            body: JSON.stringify(newData),
        });

        if (!response.ok) {
            throw new Error('Erreur lors de la mise à jour de la carte');
        }

        const updatedCard = await response.json();

        return updatedCard;
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la carte :', error);
        return null;
    }
}
async function deleteCard(cardId) {
    try {
        const token = document.head.querySelector(
            'meta[name=csrf-token]'
        ).content;
        const response = await fetch(`${config.base_url}/cards/${cardId}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'x-csrf-token': token,
            }
        });

       
        if (response.ok) {
            console.log('La carte a été supprimée avec succès.');
        } else {
           
            throw new Error('La suppression de la carte a échoué.');
        }
    } catch (error) {
        
        console.error('Une erreur s\'est produite lors de la suppression de la carte:', error);
      
        alert('Une erreur s\'est produite lors de la suppression de la carte. Veuillez réessayer plus tard.');
    }
}





export { getListsFromAPI, createList, createCard, getToken, updateList, updateCard, deleteCard };
