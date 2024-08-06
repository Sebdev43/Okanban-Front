// formHandlers.js
import { handleAddListForm, handleEditListForm } from './listHandlers.js';
import { handleAddCardForm, handleEditCardForm } from './cardHandlers.js';
import { handleAddTagForm, handleEditTagForm } from './tagHandlers.js';

/**
 * Escape HTML to prevent XSS attacks.
 * @param {string} str - The string to escape.
 * @returns {string} - The escaped string.
 */
function escapeHTML(str) {
    const section = document.createElement('section');
    section.appendChild(document.createTextNode(str));
    return section.innerHTML;
}

/**
 * Validate form fields before submission.
 * @param {HTMLFormElement} form - The form to validate.
 * @returns {boolean} - True if all fields are valid, false otherwise.
 */
function validateForm(form) {
    const inputs = form.querySelectorAll('input, textarea');
    let valid = true;

    inputs.forEach(input => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            valid = false;
            showErrorMessage(form, `The ${input.name} field is required.`);
        }
    });

    return valid;
}

function initializeFormHandlers() {
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', (event) => {
            if (!validateForm(form)) {
                event.preventDefault();
            } else {
                form.querySelectorAll('input, textarea').forEach(input => {
                    input.value = escapeHTML(input.value);
                });
            }
        });
    });

    handleAddListForm();
    handleEditListForm();
    handleAddCardForm();
    handleEditCardForm();
    handleAddTagForm();
    handleEditTagForm();
}

export { initializeFormHandlers };
