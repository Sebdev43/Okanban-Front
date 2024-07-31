// eventHandlers.js
import { showAddListModal, showEditListForm, handleAddListForm, handleEditListForm, handleDeleteList } from '../handlers/listHandlers.js';
import { showAddCardModal, showEditCardModal, handleAddCardForm, handleEditCardForm } from '../handlers/cardHandlers.js';
import { showAddTagModal, showEditTagModal, hideModals, handleAddTagForm, handleEditTagForm, handleAssociateTagForm } from '../handlers/tagHandlers.js';

function addListenerToActions() {
    const addListBtn = document.getElementById('addListButton');
    if (addListBtn) {
        addListBtn.addEventListener('click', showAddListModal);
    }

    const addTagBtn = document.getElementById('addTagButton');
    if (addTagBtn) {
        addTagBtn.addEventListener('click', showAddTagModal);
    }

    const closeModalBtns = document.querySelectorAll('.close');
    closeModalBtns.forEach((btn) => {
        btn.addEventListener('click', hideModals);
    });

    document.querySelectorAll('.panel h2').forEach(heading => {
        heading.addEventListener('dblclick', showEditListForm);
    });

    document.querySelectorAll('.fa-plus').forEach(button => {
        button.addEventListener('click', showAddCardModal);
    });

    document.querySelectorAll('.edit-card').forEach(button => {
        button.addEventListener('click', showEditCardModal);
    });

    document.querySelectorAll('.delete-list').forEach(button => {
        button.addEventListener('click', handleDeleteList);
    });

    document.querySelectorAll('#tag-container .tag').forEach(tag => {
        tag.addEventListener('dblclick', (event) => {
            const tagId = event.currentTarget.getAttribute('data-tag-id');
            const tagName = event.currentTarget.textContent;
            const tagColor = event.currentTarget.style.backgroundColor;
            showEditTagModal(tagId, tagName, tagColor);
        });
    });

    handleAddListForm();
    handleEditListForm();
    handleAddCardForm();
    handleEditCardForm();
    handleAddTagForm();
    handleEditTagForm();
    handleAssociateTagForm();
}

export { addListenerToActions };
