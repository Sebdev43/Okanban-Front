import {
  createList,
  updateList,
  deleteList,
} from "../lists/api.lists.module.js";

function showAddListModal() {
  document.getElementById("addListModal").classList.add("is-active");
}

function showEditListForm(event) {
  const listElement = event.currentTarget.closest(".panel");
  const form = listElement.querySelector(".js-list-form");
  form.classList.toggle("is-hidden");
}

async function handleAddListForm() {
  const addListForm = document.querySelector("#addListModal form");
  addListForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(addListForm);
    await createList(Object.fromEntries(data.entries()));
    window.location.reload();
  });
}

async function handleEditListForm() {
  const editListForms = document.querySelectorAll(".js-list-form");
  editListForms.forEach((form) => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const listId = data.get("list-id");
      const listData = Object.fromEntries(data.entries());
      delete listData['list-id']; 
      await updateList(listId, listData);
      window.location.reload();
    });
  });
}

async function handleDeleteList(event) {
  event.preventDefault();
  const listElement = event.currentTarget.closest(".panel");
  const listId = listElement.getAttribute("data-list-id");
  await deleteList(listId);
  window.location.reload();
}

export {
  showAddListModal,
  showEditListForm,
  handleAddListForm,
  handleEditListForm,
  handleDeleteList,
};
