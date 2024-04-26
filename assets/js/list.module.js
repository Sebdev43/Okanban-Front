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

function handleAddListForm() {
    const addListForm = document.querySelector('#addListModal form');

    addListForm.addEventListener('submit', makeListInDOM);
}

function hideModals() {
    document.getElementById('addListModal').classList.remove('is-active');
}

function showAddListModal() {
    document.getElementById('addListModal').classList.add('is-active');
}

function makeListInDOM(event) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target));
    console.log(data);
}

export { addListenerToActions };
