/**
 * Class representing an abstraction for making HTTP requests with CSRF protection.
 */
class FetchClass {
  #methods = {
    GET: "GET",
    POST: "POST",
    PATCH: "PATCH",
    DELETE: "DELETE",
  };

  /**
   * Create a FetchClass instance.
   * @param {string} endpoint - The API endpoint to interact with.
   */
  constructor(endpoint) {
    this.url = new URL(endpoint, window.location.origin);
    this.headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
    });
    this.token = null;
    this.req = null;
  }

  /**
   * Fetch the CSRF token from the server.
   * @returns {Promise<void>}
   * @throws Will throw an error if the CSRF token cannot be fetched.
   */
  async getCSRFToken() {
    try {
      const response = await fetch("/api/token", {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch CSRF token");
      }
      const data = await response.json();
      this.token = data.csrfToken;
    } catch (error) {
      console.error("Error fetching CSRF token:", error);
      throw error;
    }
  }

  /**
   * Prepare the request with the given HTTP method and set the CSRF token header.
   * @param {string} [method='GET'] - The HTTP method to use.
   * @returns {Promise<FetchClass>}
   * @throws Will throw an error if the HTTP method is invalid or the CSRF token cannot be fetched.
   */
  async make(method = "GET") {
    if (!this.#methods[method]) {
      throw new Error("Invalid HTTP method");
    }

    if (!this.token) {
      await this.getCSRFToken();
    }

    this.req = new Request(this.url, {
      method: this.#methods[method],
      headers: this.headers,
      credentials: "include",
    });

    if (this.token) {
      this.headers.set("x-csrf-token", this.token);
    }

    return this;
  }

  /**
   * Send the prepared request with optional data.
   * @param {Object|null} [data=null] - The data to send with the request.
   * @returns {Promise<Object>} - The response data.
   * @throws Will throw an error if the request fails.
   */
  async send(data = null) {
    const options = {
      method: this.req.method,
      headers: this.headers,
      credentials: "include",
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    try {
      const res = await fetch(this.req, options);
      return await this.response(res);
    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    }
  }

  /**
   * Handle the response from the server.
   * @param {Response} res - The response object.
   * @returns {Promise<Object>} - The parsed response data.
   * @throws Will throw an error if the response is not OK.
   */
  async response(res) {
    try {
      const data = await res.json();
      if (res.ok) {
        return data;
      }
      throw new Error(data.error || "Unknown error");
    } catch (error) {
      console.error("Response error:", error);
      throw error;
    }
  }
}

export { FetchClass };
