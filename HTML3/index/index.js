document.addEventListener('DOMContentLoaded', () => {

  if (isLoggedIn()) {

    setupLogoutButton();
  } else {

    setupLoginButton();
    setupSignupButton();
  }

  function setupLoginButton() {
    const loginButton = document.getElementById('login-button');
    if (loginButton) {
      loginButton.addEventListener('click', () => {
        window.location.href = '/logare/login.html';
      });
    }
  }

  function setupSignupButton() {
    const signupButton = document.getElementById('signup-button');
    if (signupButton) {
      signupButton.addEventListener('click', () => {
        window.location.href = '/register/signup.html';
      });
    }
  }

  function setupLogoutButton() {
    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
      logoutButton.addEventListener('click', () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userEmail');
        window.location.href = '/logare/login.html';
      });
    }
  }

  function isLoggedIn() {
    return localStorage.getItem('isLoggedIn') === 'true';
  }
});
