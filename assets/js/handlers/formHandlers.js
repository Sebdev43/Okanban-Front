import { handleAddListForm, handleEditListForm } from './listHandlers.js';
import { handleAddCardForm, handleEditCardForm } from './cardHandlers.js';
import { handleAddTagForm, handleEditTagForm } from './tagHandlers.js';

function initializeFormHandlers() {
    handleAddListForm();
    handleEditListForm();
    handleAddCardForm();
    handleEditCardForm();
    handleAddTagForm();
    handleEditTagForm();
}

export { initializeFormHandlers };
