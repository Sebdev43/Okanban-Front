import { config } from '../config.module.js';

// * Les méthodes pour créer des listes et cartes sont très similaires, il faudrait envisager une ou plusieurs abstractions pour rester DRY

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

        return data;
    } catch (error) {
        console.log(error);
        // document.location.href = 'http://localhost:3000/error.html';
        // Faire une redirection ou retourner une message d'erreur
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

async function updateList(id, data) {
    // * on doit envoyer un requête à l'API pour mettre à jour une liste
    // * on a besoin : du token, de la route, des infos de la liste
    try {
        const token = document.head.querySelector(
            'meta[name=csrf-token]'
        ).content;

        const url = `${config.base_url}/lists/${id}`;
        console.log(url);
        const response = await fetch(url, {
            method: 'PATCH',
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

        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

export { getListsFromAPI, createList, updateList };
