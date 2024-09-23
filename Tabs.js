// Tabs.js
export class Tabs {
  constructor() {
    this.tabLinks = document.querySelectorAll('.tablink');
    this.tabContents = document.querySelectorAll('.tabcontent');
    this.setupEventListeners();
  }

  setupEventListeners() {
    this.tabLinks.forEach((tab) => {
      tab.addEventListener('click', this.handleTabClick.bind(this));
      tab.addEventListener('keydown', this.handleKeyDown.bind(this));
    });
  }

  handleTabClick(e) {
    const clickedTab = e.target;
    this.activateTab(clickedTab);
  }

  handleKeyDown(e) {
    const currentTab = e.target;
    let newTab;

    switch (e.key) {
      case 'ArrowLeft':
        newTab =
          currentTab.previousElementSibling ||
          this.tabLinks[this.tabLinks.length - 1];
        break;
      case 'ArrowRight':
        newTab = currentTab.nextElementSibling || this.tabLinks[0];
        break;
      default:
        return;
    }

    e.preventDefault();
    newTab.focus();
    this.activateTab(newTab);
  }

  activateTab(tab) {
    this.tabLinks.forEach((t) => t.setAttribute('aria-selected', 'false'));
    this.tabContents.forEach((c) => c.setAttribute('hidden', ''));

    tab.setAttribute('aria-selected', 'true');
    const tabContent = document.getElementById(
      tab.getAttribute('aria-controls')
    );
    tabContent.removeAttribute('hidden');
  }
}
