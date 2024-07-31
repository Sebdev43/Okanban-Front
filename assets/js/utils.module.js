/**
 * Retrieves the CSRF token from the meta tag in the document head.
 * @function getMetaCsrf
 * @returns {string} The CSRF token.
 */
function getMetaCsrf() {
    const tokenElement = document.head.querySelector('meta[name=csrf-token]');
    return tokenElement ? tokenElement.content : '';
}

export { getMetaCsrf };
