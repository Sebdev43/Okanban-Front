import {
  createTag,
  updateTag,
  deleteTag,
  getTagsFromAPI,
} from "../tags/api.tags.module.js";

function showAddTagModal() {
  document.getElementById("addTagModal").classList.add("is-active");
}

function showEditTagModal(tagId, tagName, tagColor) {
  const editTagModal = document.getElementById("editTagModal");
  if (editTagModal) {
    const tagNameInput = editTagModal.querySelector('input[name="name"]');
    const tagColorInput = editTagModal.querySelector('input[name="color"]');
    const tagIdInput = editTagModal.querySelector('input[name="id"]');
    const deleteTagButton = editTagModal.querySelector("#deleteTagButton");

    tagNameInput.value = tagName;
    tagColorInput.value = tagColor;
    tagIdInput.value = tagId;

    deleteTagButton.onclick = () => handleDeleteTag(tagId);

    editTagModal.classList.add("is-active");
  }
}

async function handleDeleteTag(tagId) {
  if (confirm("Are you sure you want to delete this tag?")) {
    await deleteTag(tagId);
    window.location.reload(); // Refresh to remove the deleted tag
  }
}
function showAssociateTagModal() {
  document.getElementById("associateTagModal").classList.add("is-active");
}

function hideModals() {
  const modals = document.querySelectorAll(".modal");
  modals.forEach((modal) => {
    modal.classList.remove("is-active");
  });
}

async function handleAddTagForm() {
  const addTagForm = document.querySelector("#addTagModal form");
  addTagForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(addTagForm);
    await createTag(Object.fromEntries(data.entries()));
    window.location.reload(); // Refresh to load new tag
  });
}

async function handleEditTagForm() {
  const editTagForm = document.querySelector("#editTagModal form");
  editTagForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(editTagForm);
    const tagId = data.get("id");
    await updateTag(tagId, Object.fromEntries(data.entries()));
    window.location.reload(); // Refresh to load updated tag
  });
}

function populateTagsSelect(tags) {
  const tagSelectElements = document.querySelectorAll(
    'select[name="selectedTag"]'
  );
  tagSelectElements.forEach((select) => {
    select.innerHTML = '<option value="">Aucun</option>'; // Clear existing options
    tags.forEach((tag) => {
      const option = document.createElement("option");
      option.value = tag.id;
      option.textContent = tag.name;
      select.appendChild(option);
    });
  });
}

async function loadAndPopulateTags() {
  const tags = await getTagsFromAPI();
  populateTagsSelect(tags);
}

export {
  showAddTagModal,
  showEditTagModal,
  showAssociateTagModal,
  hideModals,
  handleAddTagForm,
  handleEditTagForm,
  loadAndPopulateTags,
};
