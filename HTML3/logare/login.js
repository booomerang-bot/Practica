document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form')
  const email_input = document.getElementById('email-input')
  const password_input = document.getElementById('password-input')
  const error_message = document.getElementById('error-message')

  if (form) {
    form.addEventListener('submit', (e) => {
      const errors = getLoginFormErrors(email_input.value, password_input.value)

      if (errors.length > 0) {
        e.preventDefault()
        error_message.innerText = errors.join('. ')
      } else {
        e.preventDefault()
        localStorage.setItem('isLoggedIn', 'true')
        window.location.href = 'home.html'
      }
    })

    const inputs = [email_input, password_input]
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        if (input.parentElement.classList.contains('incorrect')) {
          input.parentElement.classList.remove('incorrect')
          error_message.innerText = ''
        }
      })
    })
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
