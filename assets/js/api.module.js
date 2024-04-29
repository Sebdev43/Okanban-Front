import { config } from './config.module.js';

async function getListsFromAPI() {
    const response = await fetch(`${config.base_url}/lists`);
    const data = await response.json();

    return data;
}

export { getListsFromAPI };
