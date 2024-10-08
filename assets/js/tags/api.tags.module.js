import { FetchClass } from "../lib/FetchClass.js";

async function getTagsFromAPI() {
  const fetchClass = new FetchClass("/api/tags");
  await fetchClass.make("GET");
  return fetchClass.send();
}

async function createTag(data) {
  const fetchClass = new FetchClass("/api/tags");
  await fetchClass.make("POST");
  return fetchClass.send(data);
}

async function updateTag(id, data) {
  const fetchClass = new FetchClass(`/api/tags/${id}`);
  await fetchClass.make("PATCH");
  return fetchClass.send(data);
}

async function deleteTag(id) {
  const fetchClass = new FetchClass(`/api/tags/${id}`);
  await fetchClass.make("DELETE");
  return fetchClass.send();
}

export { getTagsFromAPI, createTag, updateTag, deleteTag };
