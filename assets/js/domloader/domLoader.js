import { getListsFromAPI } from '../lists/api.lists.module.js';
import { getCardsFromList } from '../cards/api.cards.module.js';
import { getTagsFromAPI } from '../tags/api.tags.module.js';
import { displayLists, displayCards, displayTags } from './renderers.js';

async function loadInitialData() {
    try {
        const lists = await getListsFromAPI();
        console.log('Loaded lists:', lists);
        displayLists(lists);

        const cardsPromises = lists.map(list => getCardsFromList(list.id));
        const cardsArray = await Promise.all(cardsPromises);
        const cards = cardsArray.flat();
        console.log('Loaded cards:', cards);

        const tags = await getTagsFromAPI();
        console.log('Loaded tags:', tags);

        displayCards(cards, tags);
        displayTags(tags);
    } catch (error) {
        console.error('Error loading initial data:', error);
    }
}

export { loadInitialData };
