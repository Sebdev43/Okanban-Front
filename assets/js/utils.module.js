import { handleAddListForm, showAddListModal } from './list.module.js';

// * peut-être bouger cette function ailleurs
function addListenerToActions() {
    const addListBtn = document.getElementById('addListButton');
    addListBtn.addEventListener('click', showAddListModal);

    const closeListModalBtns = document.querySelectorAll('.close');
    closeListModalBtns.forEach((btn) => {
        btn.addEventListener('click', hideModals);
    });

    handleAddListForm();
}

function hideModals() {
    document.getElementById('addListModal').classList.remove('is-active');
}

export { addListenerToActions, hideModals };
