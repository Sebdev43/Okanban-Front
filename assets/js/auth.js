import { FetchClass } from './lib/FetchClass.js';

/**
 * Handle the login form submission.
 */
async function handleLoginForm() {
    const loginForm = document.getElementById('login');
    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const formData = new FormData(loginForm);
            const userData = {
                email: formData.get('email'),
                password: formData.get('password'),
            };

            try {
                const fetchClass = new FetchClass('/api/login');
                await fetchClass.make('POST');
                console.log('Sending login data:', userData);
                const response = await fetchClass.send(userData);

                if (response.error) throw new Error(response.error);
                window.location.href = '/kanban.html'; // Redirect to Kanban page after successful login
            } catch (error) {
                console.error('Login error:', error);
                alert('Login failed');
            }
        });
    }
}

/**
 * Handle the register form submission.
 */
async function handleRegisterForm() {
    const registerForm = document.getElementById('register');
    if (registerForm) {
        registerForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const formData = new FormData(registerForm);
            const userData = {
                email: formData.get('email'),
                password: formData.get('password'),
            };

            try {
                const fetchClass = new FetchClass('/api/register');
                await fetchClass.make('POST');
                console.log('Sending register data:', userData);
                const response = await fetchClass.send(userData);

                if (response.error) throw new Error(response.error);
                window.location.href = '/kanban.html'; // Redirect to Kanban page after successful registration
            } catch (error) {
                console.error('Registration error:', error);
                alert('Registration failed');
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('show-register').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('login-form').classList.add('is-hidden');
        document.getElementById('register-form').classList.remove('is-hidden');
    });

    document.getElementById('show-login').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('register-form').classList.add('is-hidden');
        document.getElementById('login-form').classList.remove('is-hidden');
    });

    handleLoginForm();
    handleRegisterForm();
});
