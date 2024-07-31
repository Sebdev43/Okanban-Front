class FetchClass {
    #methods = {
        GET: 'GET',
        POST: 'POST',
        PATCH: 'PATCH',
        DELETE: 'DELETE',
    };

    constructor(endpoint) {
        this.url = new URL(endpoint, window.location.origin); // Correction de l'URL
        this.headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        });
        this.token = null;
        this.req = null;
    }

    async getCSRFToken() {
        try {
            const response = await fetch('/api/token', {
                credentials: 'include',
            });
            if (!response.ok) {
                throw new Error('Failed to fetch CSRF token');
            }
            const data = await response.json();
            this.token = data.csrfToken;
            console.log('CSRF Token fetched:', this.token);
        } catch (error) {
            console.error('Error fetching CSRF token:', error);
            throw error;
        }
    }

    async make(method = 'GET') {
        if (!this.#methods[method]) {
            throw new Error('Invalid HTTP method');
        }

        if (!this.token) {
            await this.getCSRFToken();
        }

        this.req = new Request(this.url, {
            method: this.#methods[method],
            headers: this.headers,
            credentials: 'include',
        });

        if (this.token) {
            this.headers.set('x-csrf-token', this.token);
            console.log('CSRF Token set in headers:', this.token);
        }

        return this;
    }

    async send(data = null) {
        const options = {
            method: this.req.method,
            headers: this.headers,
            credentials: 'include',
        };

        if (data) {
            options.body = JSON.stringify(data);
        }

        try {
            const res = await fetch(this.req, options);
            return await this.response(res);
        } catch (error) {
            console.error('Fetch error:', error);
            throw error;
        }
    }

    async response(res) {
        try {
            const data = await res.json();
            if (res.ok) {
                return data;
            }
            throw new Error(data.error || 'Unknown error');
        } catch (error) {
            console.error('Response error:', error);
            throw error;
        }
    }
}

export { FetchClass };
