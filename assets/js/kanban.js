// kanban.js
import { loadInitialData } from './domloader/domLoader.js';
import { addListenerToActions } from './events/eventHandlers.js';
import { setupDragAndDrop } from './Sortablejs.module.js';

document.addEventListener('DOMContentLoaded', async () => {
    await loadInitialData();
    addListenerToActions();
    setupDragAndDrop();
    console.log('Kanban board initialized successfully.');
});
