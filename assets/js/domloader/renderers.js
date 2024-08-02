import { showEditTagModal } from "../handlers/tagHandlers.js";
function displayTags(tags) {
  const tagContainer = document.getElementById("tag-container");
  tagContainer.innerHTML = "";

  tags.forEach((tag) => {
    const tagElement = document.createElement("div");
    tagElement.classList.add("tag");
    tagElement.textContent = tag.name;
    tagElement.style.backgroundColor = tag.color;
    tagElement.setAttribute("data-tag-id", tag.id);

    tagElement.addEventListener("dblclick", (event) => {
      const tagId = event.currentTarget.getAttribute("data-tag-id");
      const tagName = event.currentTarget.textContent;
      const tagColor = event.currentTarget.style.backgroundColor;
      showEditTagModal(tagId, tagName, tagColor);
    });

    tagContainer.appendChild(tagElement);
  });
}

function displayCards(cards, tags) {
  const listsContainer = document.getElementById("lists-container");
  listsContainer
    .querySelectorAll(".panel .panel-block")
    .forEach((panelBlock) => {
      panelBlock.innerHTML = "";
    });

  cards.forEach((card) => {
    const listElement = listsContainer.querySelector(
      `.panel[data-list-id="${card.list_id}"] .panel-block`
    );
    const cardElement = document.createElement("div");
    cardElement.classList.add("box");
    cardElement.setAttribute("data-card-id", card.id);

    let cardTagColor = "";
    if (card.tags && card.tags.length > 0) {
      cardTagColor = card.tags[0].color;
    }

    cardElement.style.backgroundColor = cardTagColor;

    cardElement.innerHTML = `
            <div class="columns">
                <div class="column">${card.content}</div>
                <div class="column is-narrow">
                    <a href="#" class="delete-card">
                        <span class="icon is-small has-text-danger">
                            <i class="fas fa-trash-alt"></i>
                        </span>
                    </a>
                    &nbsp;&nbsp;
                    <a href="#" class="edit-card">
                        <span class="icon is-small has-text-primary">
                            <i class="fas fa-pencil-alt"></i>
                        </span>
                    </a>
                </div>
            </div>
        `;

    listElement.appendChild(cardElement);
  });
}
function displayLists(lists) {
  const listsContainer = document.getElementById("lists-container");
  listsContainer.innerHTML = "";

  lists.forEach((list) => {
    const listElement = document.createElement("div");
    listElement.classList.add("column", "is-one-quarter", "panel");
    listElement.setAttribute("data-list-id", list.id);

    listElement.innerHTML = `
            <div class="panel-heading has-background-info">
                <div class="columns">
                    <div class="column js-sort-list">
                        <h2 class="has-text-white">${list.title}</h2>
                        <form method="POST" class="is-hidden js-list-form">
                            <input type="hidden" name="list-id" value="${list.id}">
                            <div class="field has-addons">
                                <div class="control">
                                    <input type="text" class="input is-small" name="title" placeholder="List name">
                                </div>
                                <div class="control">
                                    <button class="button is-small is-success">Save</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="column is-narrow">
                        <a href="#" class="delete-list">
                            <span class="icon is-small has-text-danger">
                                <svg class="svg-inline--fa fa-trash-alt fa-w-14" aria-hidden="true" data-prefix="fas" data-icon="trash-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg="">
                                    <path fill="currentColor" d="M0 84V56c0-13.3 10.7-24 24-24h112l9.4-18.7c4-8.2 12.3-13.3 21.4-13.3h114.3c9.1 0 17.4 5.1 21.5 13.3L312 32h112c13.3 0 24 10.7 24 24v28c0 6.6-5.4 12-12 12H12C5.4 96 0 90.6 0 84zm416 56v324c0 26.5-21.5 48-48 48H80c-26.5 0-48-21.5-48-48V140c0-6.6 5.4-12 12-12h360c6.6 0 12 5.4 12 12zm-272 68c0-8.8-7.2-16-16-16s-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208zm96 0c0-8.8-7.2-16-16-16s-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208zm96 0c0-8.8-7.2-16-16-16s-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208z"></path>
                                </svg>
                            </span>
                        </a>
                        &nbsp;&nbsp;&nbsp;
                        <a href="#" class="is-pulled-right add-card-button">
                            <span class="icon is-small has-text-white">
                                <svg class="svg-inline--fa fa-plus fa-w-14" aria-hidden="true" data-prefix="fas" data-icon="plus" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg="">
                                    <path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path>
                                </svg>
                            </span>
                        </a>
                    </div>
                </div>
            </div>
            <div class="panel-block is-block has-background-light">
                <!-- cards will be appended here -->
            </div>
        `;

    listsContainer.appendChild(listElement);
  });
}

export { displayTags, displayCards, displayLists };
