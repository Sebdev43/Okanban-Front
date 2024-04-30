import { config } from '../config.module.js';

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

export { createCard };
