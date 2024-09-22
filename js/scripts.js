document.addEventListener('DOMContentLoaded', () => {
  // Form Elements
  const registerForm = document.getElementById('register-form');
  const firstNameInput = document.getElementById('first-name');
  const lastNameInput = document.getElementById('last-name');
  const usernameInput = document.getElementById('username');
  const emailInput = document.getElementById('email');
  const dateInput = document.getElementById('date');
  const userTableBody = document.querySelector('#user-table tbody');
  const deleteAllButton = document.getElementById('delete-all');

  // Helper Function to Validate Email
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  // Load Users from Local Storage (Simulating JSON Database)
  function loadUsers() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users;
  }

  // Save Users to Local Storage
  function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
  }

  // Display Users in Table
  function displayUsers() {
    const users = loadUsers();
    userTableBody.innerHTML = ''; // Clear current rows
    users.forEach((user) => {
      const row = `<tr>
                          <td>${user.firstName}</td>
                          <td>${user.lastName}</td>
                          <td>${user.username}</td>
                          <td>${user.email}</td>
                          <td>${user.dateOfBirth}</td>
                       </tr>`;
      userTableBody.insertAdjacentHTML('beforeend', row);
    });
  }

  // Form Submission Handler
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Input Validation
    const firstName = firstNameInput.value.trim();
    const lastName = lastNameInput.value.trim();
    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const dateOfBirth = dateInput.value;

    let valid = true;

    // Validate First Name
    if (!firstName) {
      document.getElementById('first-name-error').style.visibility = 'visible';
      valid = false;
    } else {
      document.getElementById('first-name-error').style.visibility = 'hidden';
    }

    // Validate Last Name
    if (!lastName) {
      document.getElementById('last-name-error').style.visibility = 'visible';
      valid = false;
    } else {
      document.getElementById('last-name-error').style.visibility = 'hidden';
    }

    // Validate Username
    if (!username) {
      document.getElementById('username-error').style.visibility = 'visible';
      valid = false;
    } else {
      document.getElementById('username-error').style.visibility = 'hidden';
    }

    // Validate Email
    if (!email || !validateEmail(email)) {
      document.getElementById('email-error').style.visibility = 'visible';
      valid = false;
    } else {
      document.getElementById('email-error').style.visibility = 'hidden';
    }

    if (valid) {
      // Save the new user
      const users = loadUsers();
      users.push({ firstName, lastName, username, email, dateOfBirth });
      saveUsers(users);
      displayUsers();

      // Clear form fields
      registerForm.reset();
    }
  });

  // Delete All Users
  deleteAllButton.addEventListener('click', () => {
    localStorage.removeItem('users');
    displayUsers(); // Refresh the table
  });

  // Initial Load
  displayUsers();
});
