// main.js
import { Form } from './Form.js';
import { Table } from './Table.js';
import { Tabs } from './Tabs.js';

document.addEventListener('DOMContentLoaded', () => {
  try {
    new Form();
    new Table();
    new Tabs();
  } catch (error) {
    console.error('Error initializing application:', error);
    alert(
      'An error occurred while loading the application. Please refresh the page and try again.'
    );
  }
});

// Global error handler
window.addEventListener('error', (event) => {
  console.error('Uncaught error:', event.error);
  alert('An unexpected error occurred. Please refresh the page and try again.');
});
