export const loadUsers = () => {
  try {
    return JSON.parse(localStorage.getItem('users')) || [];
  } catch (error) {
    console.error('Error loading users from localStorage:', error);
    return [];
  }
};

export const saveUsers = (users) => {
  try {
    localStorage.setItem('users', JSON.stringify(users));
  } catch (error) {
    console.error('Error saving users to localStorage:', error);
    throw error;
  }
};
