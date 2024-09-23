// Table.js
import { loadUsers } from '../utils/storage.js';

export class Table {
  constructor() {
    this.tableBody = document.querySelector('#user-table tbody');
    this.itemsPerPage = 5;
    this.currentPage = 1;
    this.setupEventListeners();
  }

  setupEventListeners() {
    document.addEventListener('usersUpdated', this.displayUsers.bind(this));
    document
      .getElementById('items-per-page')
      .addEventListener('change', this.handleItemsPerPageChange.bind(this));
    document
      .getElementById('prev-page')
      .addEventListener('click', this.handlePrevPage.bind(this));
    document
      .getElementById('next-page')
      .addEventListener('click', this.handleNextPage.bind(this));
  }

  displayUsers() {
    try {
      const users = loadUsers();
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      const paginatedUsers = users.slice(start, end);

      this.tableBody.innerHTML = '';
      paginatedUsers.forEach((user) => {
        const row = `
          <tr>
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${user.dateOfBirth || 'N/A'}</td>
            <td style="background-color: ${user.favoriteColor};">${
          user.favoriteColor
        }</td>
            <td>${user.gender || 'N/A'}</td>
          </tr>
        `;
        this.tableBody.insertAdjacentHTML('beforeend', row);
      });

      this.updatePaginationControls(users.length);
    } catch (error) {
      console.error('Error loading user data:', error);
      this.tableBody.innerHTML =
        '<tr><td colspan="7">Error loading user data. Please try refreshing the page.</td></tr>';
    }
  }

  handleItemsPerPageChange(e) {
    this.itemsPerPage = parseInt(e.target.value);
    this.currentPage = 1;
    this.displayUsers();
  }

  handlePrevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.displayUsers();
    }
  }

  handleNextPage() {
    const users = loadUsers();
    if (this.currentPage < Math.ceil(users.length / this.itemsPerPage)) {
      this.currentPage++;
      this.displayUsers();
    }
  }

  updatePaginationControls(totalUsers) {
    const prevButton = document.getElementById('prev-page');
    const nextButton = document.getElementById('next-page');

    prevButton.disabled = this.currentPage === 1;
    nextButton.disabled =
      this.currentPage === Math.ceil(totalUsers / this.itemsPerPage);
  }
}
