import { updateListOrder } from "./lists/api.lists.module";
import { updateCardOrder } from "./cards/api.cards.module";
import Sortable from 'sortablejs';

function setupDragAndDrop() {
    
    const lists = document.querySelectorAll('.panel');

   
    lists.forEach(list => {
        Sortable.create(list.querySelector('.panel-block'), {
            group: 'list',
            animation: 150,
            onEnd: async function (evt) {
                
                const listId = list.dataset.listId;
                const cardId = evt.item.dataset.cardId;
                const newPosition = evt.newIndex + 1;
                await updateListOrder(listId, newPosition);
                console.log("List ID:", listId, "Card ID:", cardId, "New Position:", newPosition);
            }
        });
    });
}
function setupCardDragAndDrop() {
    
    const cards = document.querySelectorAll('.box');

    
    cards.forEach(card => {
        Sortable.create(card.parentElement, {
            group: 'card',
            animation: 150,
            onEnd: async function (evt) {
                
                const listId = card.parentElement.parentElement.dataset.listId;
                const cardId = card.dataset.cardId;
                const newPosition = evt.newIndex + 1;
                await updateCardOrder(listId, cardId, newPosition);
                console.log("List ID:", listId, "Card ID:", cardId, "New Position:", newPosition);
            }
        });
    });
}

export { setupDragAndDrop, setupCardDragAndDrop };