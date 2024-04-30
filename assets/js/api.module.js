import { config } from './config.module.js';

async function getToken() {
    try {
        // * Ce premier fetch sert à mettre en place le csrf-token sur la session du serveur, et dans la balise meta du front
        // * Ce serait mieux de ne pas avoir une route dédiée pour faire ce token (sur la route '/' ce serait l'idéal)
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

export { getToken };
