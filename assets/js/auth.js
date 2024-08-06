import { FetchClass } from "./lib/FetchClass.js";

const emailRegex = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;


const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

/**
 * Validate the email format.
 * @param {string} email - The email to validate.
 * @returns {boolean} - True if the email is valid, false otherwise.
 */
export function validateEmail(email) {
  return emailRegex.test(email);
}

/**
 * Validate the password strength.
 * @param {string} password - The password to validate.
 * @returns {boolean} - True if the password meets the criteria, false otherwise.
 */
export function validatePassword(password) {
  return passwordRegex.test(password);
}

/**
 * Display an error message in the form.
 * @param {HTMLFormElement} form - The form element.
 * @param {string} message - The error message to display.
 */
export function showErrorMessage(form, message) {
  let errorElement = form.querySelector(".error-message");
  if (!errorElement) {
    errorElement = document.createElement("p");
    errorElement.className = "error-message has-text-danger";
    form.appendChild(errorElement);
  }
  errorElement.textContent = message;
}

/**
 * Handle the login form submission.
 */
export async function handleLoginForm() {
  const loginForm = document.getElementById("login");
  if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const formData = new FormData(loginForm);
      const email = formData.get("email");
      const password = formData.get("password");

      if (!validateEmail(email)) {
        showErrorMessage(loginForm, "Please enter a valid email.");
        return;
      }
      if (!validatePassword(password)) {
        showErrorMessage(
          loginForm,
          "The password must contain at least 8 characters, one upper case, one lower case, one number and one special character."
        );
        return;
      }

      const userData = { email, password };

      try {
        const fetchClass = new FetchClass("/api/login");
        await fetchClass.make("POST");
        const response = await fetchClass.send(userData);

        if (response.error) throw new Error(response.error);
        window.location.href = "/kanban.html";
      } catch (error) {
        console.error("Connection error :", error);
        showErrorMessage(loginForm, "Connection failed. Please try again.");
      }
    });
  }
}

/**
 * Handle the register form submission.
 */
export async function handleRegisterForm() {
  const registerForm = document.getElementById("register");
  if (registerForm) {
    registerForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const formData = new FormData(registerForm);
      const email = formData.get("email");
      const password = formData.get("password");

      if (!validateEmail(email)) {
        showErrorMessage(registerForm, "Veuillez entrer un email valide.");
        return;
      }
      if (!validatePassword(password)) {
        showErrorMessage(
          registerForm,
          "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial."
        );
        return;
      }

      const userData = { email, password };

      try {
        const fetchClass = new FetchClass("/api/register");
        await fetchClass.make("POST");
        const response = await fetchClass.send(userData);

        if (response.error) throw new Error(response.error);
        window.location.href = "/kanban.html";
      } catch (error) {
        console.error("Erreur d'inscription :", error);
        showErrorMessage(
          registerForm,
          "Échec de l'inscription. Veuillez réessayer."
        );
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("show-register").addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("login-form").classList.add("is-hidden");
    document.getElementById("register-form").classList.remove("is-hidden");
  });

  document.getElementById("show-login").addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("register-form").classList.add("is-hidden");
    document.getElementById("login-form").classList.remove("is-hidden");
  });

  handleLoginForm();
  handleRegisterForm();
});
