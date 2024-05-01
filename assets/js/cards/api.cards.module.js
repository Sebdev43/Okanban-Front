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

async function update(id, data) {
    try {
        const token = document.head.querySelector(
            'meta[name=csrf-token]'
        ).content;

        delete data['card-id'];

        const response = await fetch(`${config.base_url}/cards/${id}`, {
            method: 'PATCH',
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

async function destroy(id) {
    try {
        const token = document.head.querySelector(
            'meta[name=csrf-token]'
        ).content;

        const response = await fetch(`${config.base_url}/cards/${id}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'x-csrf-token': token,
            },
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

async function updateCardOrder(cardId, newListId, newPosition) {
    const updateData = {
        list_id: newListId,
        position: newPosition
    };
    try {
        const response = await update(cardId, updateData);
        console.log("Card updated successfully", response);
    } catch (error) {
        console.error("Error updating card:", error);
    }
}
async function associateTagWithCard(cardId, tagId) {
    try {
        const token = document.head.querySelector('meta[name=csrf-token]').content;
        
        const response = await fetch(`${config.base_url}/cards/${cardId}/tags/${tagId}`, {
            method: 'PUT', // Utilisation de POST pour créer la relation entre la carte et le tag
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'x-csrf-token': token,
            },
            body: JSON.stringify({}), // Aucun corps de requête nécessaire pour associer le tag avec la carte
        });
        
        if (!response.ok) {
            throw new Error('Failed to associate tag with card');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}


async function removeTagFromCard(cardId, tagId) {
    try {
        const response = await fetch(`${config.base_url}/cards/${cardId}/tags/${tagId}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'x-csrf-token': document.head.querySelector('meta[name="csrf-token"]').content
            }
        });

        if (!response.ok) {
            throw new Error('Failed to remove tag');
        }

        console.log('Tag removed successfully');
        return true; 
    } catch (error) {
        console.error('Error removing tag:', error);
        return false; 
    }
}






export { createCard, update, destroy, updateCardOrder, associateTagWithCard, removeTagFromCard };
