document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form')
  const firstname_input = document.getElementById('firstname-input')
  const email_input = document.getElementById('email-input')
  const password_input = document.getElementById('password-input')
  const repeat_password_input = document.getElementById('repeat-password-input')
  const error_message = document.getElementById('error-message')

  if (form) {
    form.addEventListener('submit', (e) => {
      const errors = getSignupFormErrors(
        firstname_input.value,
        email_input.value,
        password_input.value,
        repeat_password_input.value
      )

      if (errors.length > 0) {
        e.preventDefault()
        error_message.innerText = errors.join('. ')
      } else {
        e.preventDefault()
        localStorage.setItem('isLoggedIn', 'true')
        window.location.href = 'home.html'
      }
    })

    const inputs = [firstname_input, email_input, password_input, repeat_password_input]
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        if (input.parentElement.classList.contains('incorrect')) {
          input.parentElement.classList.remove('incorrect')
          error_message.innerText = ''
        }
      })
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
})
