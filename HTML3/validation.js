document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form')
  const firstname_input = document.getElementById('firstname-input')
  const email_input = document.getElementById('email-input')
  const password_input = document.getElementById('password-input')
  const repeat_password_input = document.getElementById('repeat-password-input')
  const error_message = document.getElementById('error-message')
  const logoutBtn = document.getElementById('logout-button')
  const loginBtn = document.getElementById('login-button')
  const signupBtn = document.getElementById('signup-button')

  // LOGIN / SIGNUP FORM LOGIC
  if (form) {
    form.addEventListener('submit', (e) => {
      let errors = []
      const isSignup = firstname_input && repeat_password_input

      if (isSignup) {
        errors = getSignupFormErrors(
          firstname_input.value,
          email_input.value,
          password_input.value,
          repeat_password_input.value
        )
      } else {
        errors = getLoginFormErrors(email_input.value, password_input.value)
      }

      if (errors.length > 0) {
        e.preventDefault()
        error_message.innerText = errors.join('. ')
      } else {
        e.preventDefault()
        localStorage.setItem('isLoggedIn', 'true')
        window.location.href = 'home.html'
      }
    })

    const allInputs = [firstname_input, email_input, password_input, repeat_password_input].filter(input => input != null)
    allInputs.forEach(input => {
      input.addEventListener('input', () => {
        if (input.parentElement.classList.contains('incorrect')) {
          input.parentElement.classList.remove('incorrect')
          error_message.innerText = ''
        }
      })
    })
  }

  // Protect home.html
  if (window.location.pathname.includes('home.html')) {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
      window.location.href = 'login.html'
    }
  }

  // Logout logic
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('isLoggedIn')
      window.location.href = 'login.html'
    })
  }

  // Redirect buttons to login/signup pages
  if (loginBtn) {
    loginBtn.addEventListener('click', (e) => {
      e.preventDefault()
      window.location.href = 'login.html'
    })
  }

  if (signupBtn) {
    signupBtn.addEventListener('click', (e) => {
      e.preventDefault()
      window.location.href = 'singup.html'
    })
  }

  function getSignupFormErrors(firstname, email, password, repeatpassword) {
    let errors = []

    if (!firstname) {
      errors.push('Firstname is required')
      firstname_input.parentElement.classList.add('incorrect')
    }

    if (!email) {
      errors.push('Email is required')
      email_input.parentElement.classList.add('incorrect')
    }

    if (!password) {
      errors.push('Password is required')
      password_input.parentElement.classList.add('incorrect')
    } else if (password.length < 8) {
      errors.push('Password must be at least 8 characters long')
      password_input.parentElement.classList.add('incorrect')
    }

    if (password !== repeatpassword) {
      errors.push('The passwords don’t match')
      password_input.parentElement.classList.add('incorrect')
      repeat_password_input.parentElement.classList.add('incorrect')
    }

    return errors
  }

  function getLoginFormErrors(email, password) {
    let errors = []

    if (!email) {
      errors.push('Email is required')
      email_input.parentElement.classList.add('incorrect')
    }

    if (!password) {
      errors.push('Password is required')
      password_input.parentElement.classList.add('incorrect')
    }

    return errors
  }
})
