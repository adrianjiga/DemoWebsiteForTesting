document.addEventListener('DOMContentLoaded', () => {
  // Button Click Events
  const button1 = document.getElementById('button-1');
  button1.addEventListener('click', () => {
    alert('Button 1 was clicked!');
  });

  const button2 = document.getElementById('button-2');
  button2.addEventListener('click', () => {
    console.log('Button 2 Clicked');
  });

  // Hover Effect
  const hoverButton = document.getElementById('hover-button');
  hoverButton.addEventListener('mouseover', () => {
    hoverButton.style.backgroundColor = 'green';
    hoverButton.textContent = "I'm Hovered!";
  });
  hoverButton.addEventListener('mouseout', () => {
    hoverButton.style.backgroundColor = '#007BFF';
    hoverButton.textContent = 'Hover Over Me';
  });

  // Form Validation and Submission
  const form = document.getElementById('test-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Input Validation
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    let valid = true;

    if (!name.value) {
      document.getElementById('name-error').style.visibility = 'visible';
      valid = false;
    } else {
      document.getElementById('name-error').style.visibility = 'hidden';
    }

    if (!email.value || !validateEmail(email.value)) {
      document.getElementById('email-error').style.visibility = 'visible';
      valid = false;
    } else {
      document.getElementById('email-error').style.visibility = 'hidden';
    }

    if (!password.value) {
      document.getElementById('password-error').style.visibility = 'visible';
      valid = false;
    } else {
      document.getElementById('password-error').style.visibility = 'hidden';
    }

    if (valid) {
      alert(`Form submitted with Name: ${name.value}, Email: ${email.value}`);
    }
  });

  // Validate Email Format
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  // Pagination Click Event
  const paginationLinks = document.querySelectorAll('.page-link');
  paginationLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      alert(`You clicked on page ${e.target.innerText}`);
    });
  });
});
