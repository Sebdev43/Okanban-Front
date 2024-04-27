// * Quand on importe avec ESM : on doit préciser l'extension du fichier
import { addListenerToActions } from './utils.module.js';
import { createListInDOM } from './list.module.js';


const app = {
    base_url: "http://localhost:3000",

    async getListsFromAPI() {
        try {
            const response = await fetch(`${this.base_url}/lists`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const lists = await response.json();
            if (Array.isArray(lists)) {
                lists.forEach(list => createListInDOM(list));
            } else {
                console.error("Erreur: La réponse de l'API n'est pas un tableau", lists);
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des listes: ", error);
        }
    },

    init() {
        this.getListsFromAPI();
        addListenerToActions(); 
    }
};

// Attacher l'initialisation au chargement du DOM
document.addEventListener('DOMContentLoaded', () => app.init());
