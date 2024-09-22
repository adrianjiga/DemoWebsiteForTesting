document.addEventListener('DOMContentLoaded', () => {
  // Form Elements
  const registerForm = document.getElementById('register-form');
  const firstNameInput = document.getElementById('first-name');
  const lastNameInput = document.getElementById('last-name');
  const usernameInput = document.getElementById('username');
  const emailInput = document.getElementById('email');
  const dateInput = document.getElementById('date');
  const colorPickerInput = document.getElementById('color-picker');
  const userTableBody = document.querySelector('#user-table tbody');
  const deleteAllButton = document.getElementById('delete-all');

  // Pagination Elements
  const itemsPerPageSelect = document.getElementById('items-per-page');
  const prevPageButton = document.getElementById('prev-page');
  const nextPageButton = document.getElementById('next-page');
  let currentPage = 1;
  let itemsPerPage = 5;

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

  // Display Users in Table with Pagination
  function displayUsers() {
    const users = loadUsers();
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedUsers = users.slice(start, end);

    userTableBody.innerHTML = ''; // Clear current rows
    paginatedUsers.forEach((user) => {
      const row = `<tr>
                          <td>${user.firstName}</td>
                          <td>${user.lastName}</td>
                          <td>${user.username}</td>
                          <td>${user.email}</td>
                          <td>${user.dateOfBirth}</td>
                          <td style="background-color: ${user.color};">${user.color}</td>
                       </tr>`;
      userTableBody.insertAdjacentHTML('beforeend', row);
    });
  }

  // Update Items Per Page
  itemsPerPageSelect.addEventListener('change', (e) => {
    itemsPerPage =
      e.target.value === 'all' ? Infinity : parseInt(e.target.value);
    currentPage = 1; // Reset to first page
    displayUsers();
  });

  // Pagination Controls
  prevPageButton.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      displayUsers();
    }
  });

  nextPageButton.addEventListener('click', () => {
    const users = loadUsers();
    if (currentPage < Math.ceil(users.length / itemsPerPage)) {
      currentPage++;
      displayUsers();
    }
  });

  // Form Submission Handler
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Input Validation
    const firstName = firstNameInput.value.trim();
    const lastName = lastNameInput.value.trim();
    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const dateOfBirth = dateInput.value;
    const favoriteColor = colorPickerInput.value;

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
      users.push({
        firstName,
        lastName,
        username,
        email,
        dateOfBirth,
        color: favoriteColor,
      });
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

  // Tabs Functionality
  window.openTab = function (event, tabName) {
    const tabcontent = document.querySelectorAll('.tabcontent');
    tabcontent.forEach((content) => content.classList.remove('active'));

    const tablinks = document.querySelectorAll('.tablink');
    tablinks.forEach((link) => link.classList.remove('active'));

    document.getElementById(tabName).classList.add('active');
    event.currentTarget.classList.add('active');
  };

  // Accordion Functionality
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach((header) => {
    header.addEventListener('click', () => {
      const content = header.nextElementSibling;
      content.classList.toggle('active');
    });
  });
});
