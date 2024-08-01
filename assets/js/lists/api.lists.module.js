import { FetchClass } from "../lib/FetchClass.js";

async function getListsFromAPI() {
  const fetchClass = new FetchClass("/api/lists");
  await fetchClass.make("GET");
  const response = await fetchClass.send();
  return response;
}

async function createList(data) {
  const fetchClass = new FetchClass("/api/lists");
  await fetchClass.make("POST");
  return fetchClass.send(data);
}

async function updateList(id, data) {
  const fetchClass = new FetchClass(`/api/lists/${id}`);
  await fetchClass.make("PATCH");
  return fetchClass.send(data);
}

async function deleteList(id) {
  const fetchClass = new FetchClass(`/api/lists/${id}`);
  await fetchClass.make("DELETE");
  return fetchClass.send();
}

export { getListsFromAPI, createList, updateList, deleteList };
