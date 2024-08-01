import { FetchClass } from "../lib/FetchClass.js";

async function getCardsFromList(listId) {
  const fetchClass = new FetchClass(`/api/lists/${listId}/cards`);
  await fetchClass.make("GET");
  const response = await fetchClass.send();
  return response;
}

async function createCard(data) {
  const fetchClass = new FetchClass("/api/cards");
  await fetchClass.make("POST");
  return fetchClass.send(data);
}

async function updateCard(cardID, data) {
  const fetchClass = new FetchClass(`/api/cards/${cardID}`);
  await fetchClass.make("PATCH");
  return fetchClass.send(data);
}

async function deleteCard(id) {
  const fetchClass = new FetchClass(`/api/cards/${id}`);
  await fetchClass.make("DELETE");
  return fetchClass.send();
}

export { getCardsFromList, createCard, updateCard, deleteCard };
