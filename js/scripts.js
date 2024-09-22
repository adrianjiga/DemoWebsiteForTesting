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
    return JSON.parse(localStorage.getItem('users')) || [];
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
                      <td style="background-color: ${user.color};">${
        user.color
      }</td>
                      <td>${user.gender || 'N/A'}</td>
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
    const gender = document.querySelector(
      'input[name="gender"]:checked'
    )?.value;

    let valid = true;

    // Validate Inputs
    const inputs = [
      { value: firstName, errorId: 'first-name-error' },
      { value: lastName, errorId: 'last-name-error' },
      { value: username, errorId: 'username-error' },
      {
        value: email,
        errorId: 'email-error',
        customCheck: !validateEmail(email),
      },
    ];

    inputs.forEach(({ value, errorId, customCheck }) => {
      if (!value || customCheck || false) {
        document.getElementById(errorId).style.display = 'block';
        valid = false;
      } else {
        document.getElementById(errorId).style.display = 'none';
      }
    });

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
        gender,
      });
      saveUsers(users);
      displayUsers();

      // Clear form fields
      registerForm.reset();
      document
        .querySelectorAll('.error-message')
        .forEach((msg) => (msg.style.display = 'none')); // Reset error messages
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
    tabcontent.forEach((content) => {
      content.style.display = 'none'; // Hide all tab content
    });

    const tablinks = document.querySelectorAll('.tablink');
    tablinks.forEach((link) => {
      link.classList.remove('active'); // Remove active class from all tabs
    });

    // Show the active tab content
    const activeTabContent = document.getElementById(tabName);
    activeTabContent.style.display = 'block'; // Show the selected tab content
    event.currentTarget.classList.add('active'); // Add active class to the clicked tab
  };

  // Initial setup to show the first tab
  document.addEventListener('DOMContentLoaded', () => {
    openTab(event, 'tab1'); // Show the first tab by default
  });

  // Accordion Functionality
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach((header) => {
    header.addEventListener('click', () => {
      const content = header.nextElementSibling;
      content.classList.toggle('active');

      // Toggle visibility of accordion content
      if (content.classList.contains('active')) {
        content.style.display = 'block';
      } else {
        content.style.display = 'none';
      }
    });
  });
});
