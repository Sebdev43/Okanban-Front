import {
  createCard,
  updateCard,
  deleteCard,
} from "../cards/api.cards.module.js";
import { loadAndPopulateTags } from "../handlers/tagHandlers.js";

function showAddCardModal(event) {
  const listElement = event.currentTarget.closest(".panel");
  const listId = listElement.getAttribute("data-list-id");
  const addCardModal = document.getElementById("addCardModal");

  if (addCardModal) {
    const listIdInput = addCardModal.querySelector('input[name="list_id"]');
    if (listIdInput) {
      listIdInput.value = listId;
    }
    const cardIdInput = addCardModal.querySelector('input[name="card-id"]');
    if (cardIdInput) {
      cardIdInput.value = "";
    }
    addCardModal.classList.add("is-active");
  } else {
    console.error("Add Card Modal not found");
  }

  loadAndPopulateTags();
}

function showEditCardModal(event) {
  const cardElement = event.currentTarget.closest(".box");
  const cardId = cardElement.getAttribute("data-card-id");
  const content = cardElement.querySelector(".column").textContent;
  const listId = cardElement.closest(".panel").getAttribute("data-list-id");

  const editCardModal = document.getElementById("editCardModal");

  if (editCardModal) {
    const listIdInput = editCardModal.querySelector('input[name="list_id"]');
    const cardIdInput = editCardModal.querySelector('input[name="card-id"]');
    cardIdInput.value = cardId;
    const contentInput = editCardModal.querySelector('input[name="content"]');
    const tagSelect = editCardModal.querySelector('select[name="selectedTag"]');

    if (listIdInput && cardIdInput && contentInput && tagSelect) {
      listIdInput.value = listId;
      cardIdInput.value = cardId;

      contentInput.value = content;
    }

    editCardModal.classList.add("is-active");
  }

  loadAndPopulateTags();
}

async function handleAddCardForm() {
  const addCardForm = document.querySelector("#addCardModal form");
  addCardForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(addCardForm);
    const cardData = Object.fromEntries(data.entries());
    await createCard(cardData);
    window.location.reload();
  });
}

async function handleEditCardForm() {
  const editCardForm = document.querySelector("#editCardModal form");
  editCardForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(editCardForm);

    const cardId = data.get("card-id");

    if (!cardId) {
      console.error("Card ID is missing");
      return;
    }
    const cardData = Object.fromEntries(data.entries());

    await updateCard(cardId, cardData);
    window.location.reload();
  });
}

async function handleDeleteCard(event) {
  const cardElement = event.currentTarget.closest(".box");
  const cardId = cardElement.getAttribute("data-card-id");
  console.log("Deleting card with ID:", cardId);
  await deleteCard(cardId);
  window.location.reload(); 
}

export {
  showAddCardModal,
  showEditCardModal,
  handleAddCardForm,
  handleEditCardForm,
  handleDeleteCard,
};
