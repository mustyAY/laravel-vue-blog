describe('Login tests', () => {
  it('visits the login page', () => {
    cy.visit('/login')
    cy.contains('h1', 'Log In!')
  })

  it('logs in successfully', () => {
    cy.login()
  })

  it('display errors for failed log in', () => {
    cy.visit('/login')
    cy.get('#email').type('author1@example.com')
    cy.get('#password').type('password1')
    cy.contains('button', 'Log In').click()
    cy.contains('li', 'These credentials do not match our records.')
  })

  it('logs out successfully', () => {
    cy.login().click()
    cy.contains('a', 'Login')
  })
})
