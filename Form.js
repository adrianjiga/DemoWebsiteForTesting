// Form.js
import { validateEmail } from './utils/validation.js';
import { loadUsers, saveUsers } from './utils/storage.js';

export class Form {
  constructor() {
    this.form = document.getElementById('register-form');
    this.setupEventListeners();
  }

  setupEventListeners() {
    this.form.addEventListener('submit', this.handleSubmit.bind(this));
  }

  handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(this.form);
    const userData = Object.fromEntries(formData.entries());

    if (this.validateForm(userData)) {
      try {
        const users = loadUsers();
        users.push(userData);
        saveUsers(users);
        this.clearForm();
        document.dispatchEvent(new CustomEvent('usersUpdated'));
      } catch (error) {
        console.error('Error saving user data:', error);
        alert('An error occurred while saving your data. Please try again.');
      }
    }
  }

  validateForm(userData) {
    let isValid = true;
    const errorMessages = document.querySelectorAll('.error-message');

    errorMessages.forEach((msg) => (msg.style.display = 'none'));

    if (!userData.firstName.trim()) {
      document.getElementById('first-name-error').style.display = 'block';
      isValid = false;
    }

    if (!userData.lastName.trim()) {
      document.getElementById('last-name-error').style.display = 'block';
      isValid = false;
    }

    if (!userData.username.trim()) {
      document.getElementById('username-error').style.display = 'block';
      isValid = false;
    }

    if (!validateEmail(userData.email)) {
      document.getElementById('email-error').style.display = 'block';
      isValid = false;
    }

    return isValid;
  }

  clearForm() {
    this.form.reset();
    document
      .querySelectorAll('.error-message')
      .forEach((msg) => (msg.style.display = 'none'));
  }
}
