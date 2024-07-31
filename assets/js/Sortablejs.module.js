// Sortablejs.module.js
import Sortable from 'sortablejs';

function setupDragAndDrop() {
    const listsContainer = document.getElementById('lists-container');
    if (listsContainer) {
        Sortable.create(listsContainer, {
            group: 'lists',
            animation: 150,
            onEnd: async (evt) => {
                const fromIndex = evt.oldIndex;
                const toIndex = evt.newIndex;
                console.log(`List moved from ${fromIndex} to ${toIndex}`);
                await updateListPosition(fromIndex, toIndex);
            },
        });
    }

    const cardContainers = document.querySelectorAll('.panel-block');
    cardContainers.forEach(container => {
        Sortable.create(container, {
            group: 'cards',
            animation: 150,
            onEnd: async (evt) => {
                const fromListId = evt.from.closest('.panel').dataset.listId;
                const toListId = evt.to.closest('.panel').dataset.listId;
                const fromIndex = evt.oldIndex;
                const toIndex = evt.newIndex;
                const cardId = evt.item.dataset.cardId;
                console.log(`Card ${cardId} moved from list ${fromListId} index ${fromIndex} to list ${toListId} index ${toIndex}`);
                await updateCardPosition(cardId, fromListId, toListId, fromIndex, toIndex);
            },
        });
    });
}

async function getCSRFToken() {
    const response = await fetch('api/token');
    const data = await response.json();
    return data.csrfToken;
}

async function updateListPosition(fromIndex, toIndex) {
    try {
        const csrfToken = await getCSRFToken();
        const response = await fetch('/api/lists/reorder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'CSRF-Token': csrfToken
            },
            body: JSON.stringify({ fromIndex, toIndex }),
        });

        if (!response.ok) {
            throw new Error('Failed to update list position');
        }

        console.log('List position updated successfully');
    } catch (error) {
        console.error('Error updating list position:', error);
    }
}

async function updateCardPosition(cardId, fromListId, toListId, fromIndex, toIndex) {
    try {
        const csrfToken = await getCSRFToken();
        const response = await fetch('/api/cards/reorder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'CSRF-Token': csrfToken
            },
            body: JSON.stringify({ cardId, fromListId, toListId, fromIndex, toIndex }),
        });

        if (!response.ok) {
            throw new Error('Failed to update card position');
        }

        console.log('Card position updated successfully');
    } catch (error) {
        console.error('Error updating card position:', error);
    }
}

export { setupDragAndDrop };
