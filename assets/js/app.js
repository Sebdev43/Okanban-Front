const app = {
  init: function() {
      console.log('app.init !');
      this.bindEvents();
  },

  bindEvents: function() {
      const container = document.querySelector('.container');
      container.addEventListener('click', this.handleContainerClick.bind(this));

      const addListForm = document.querySelector('#addListModal form');
      addListForm.addEventListener('submit', this.handleAddListForm.bind(this));

      const addCardForm = document.querySelector('#addCardModal form');
      addCardForm.addEventListener('submit', this.handleAddCardForm.bind(this));
  },

  handleContainerClick: function(event) {
      if (event.target.closest('#addListButton')) {
          this.showAddListModal();
      } else if (event.target.closest('.fa-plus')) {
          this.showAddCardModal(event);
      } else if (event.target.closest('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button')) {
          this.hideModals();
      }
  },

  showAddListModal: function() {
      const modal = document.getElementById('addListModal');
      modal.classList.add('is-active');
  },

  showAddCardModal: function(event) {
      const modal = document.getElementById('addCardModal');
      const listElement = event.target.closest('.panel');
      const listId = listElement.dataset.listId;
      modal.querySelector('[name="list_id"]').value = listId;
      modal.classList.add('is-active');
  },

  hideModals: function() {
      const modals = document.querySelectorAll('.modal');
      modals.forEach(modal => modal.classList.remove('is-active'));
  },

  handleAddListForm: function(event) {
      event.preventDefault();
      const formData = new FormData(event.target);
      const listName = formData.get('name');
      this.makeListInDOM(listName);
      this.hideModals();
  },

  handleAddCardForm: function(event) {
      event.preventDefault();
      const formData = new FormData(event.target);
      const cardName = formData.get('card_name');
      const listId = formData.get('list_id');
      this.makeCardInDOM(cardName, listId);
      this.hideModals();
  },

  makeListInDOM: function(listName) {
      const template = document.querySelector('#listTemplate');
      const clone = template.content.cloneNode(true);
      clone.querySelector('.panel-heading h2').textContent = listName;
      const newId = Date.now().toString(); // Create a unique ID for the new list
      clone.querySelector('.panel').dataset.listId = newId;
      document.querySelector('.card-lists').appendChild(clone);
  },

  makeCardInDOM: function(cardName, listId) {
      const list = document.querySelector(`[data-list-id="${listId}"] .panel-block`);
      const template = document.querySelector('#cardTemplate');
      const clone = template.content.cloneNode(true);
      clone.querySelector('.box').dataset.cardId = Date.now().toString(); // Unique ID for the card
      clone.querySelector('.column').textContent = cardName;
      list.appendChild(clone);
  }
};




document.addEventListener('DOMContentLoaded', app.init.bind(app));
