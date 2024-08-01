import { getListsFromAPI } from "../lists/api.lists.module.js";
import { getCardsFromList } from "../cards/api.cards.module.js";
import { getTagsFromAPI } from "../tags/api.tags.module.js";
import { displayLists, displayCards, displayTags } from "./renderers.js";

async function loadInitialData() {
  try {
    const lists = await getListsFromAPI();

    displayLists(lists);

    const cardsPromises = lists.map((list) => getCardsFromList(list.id));
    const cardsArray = await Promise.all(cardsPromises);
    const cards = cardsArray.flat();

    const tags = await getTagsFromAPI();

    displayCards(cards, tags);
    displayTags(tags);
  } catch (error) {
    console.error("Error loading initial data:", error);
  }
}

export { loadInitialData };
