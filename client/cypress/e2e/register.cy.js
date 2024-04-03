describe('Register tests', () => {
  before(() => {
    cy.refreshDatabase()
  })

  it('visits the register page', () => {
    cy.visit('/register')
    cy.contains('h1', 'Register!')
  })

  it('registers successfully', () => {
    cy.visit('/register')
    cy.get('#name').type('John Doe')
    cy.get('#email').type('john@example.com')
    cy.get('#password').type('password')
    cy.get('#password_confirmation').type('password')
    cy.contains('button', 'Submit').click()
    cy.intercept('http://localhost:8000/api/user').as('getUser')
    cy.wait('@getUser')
    cy.contains('h1', 'Blog Posts')
    cy.contains('button', 'Log Out')
  })

  it('display errors for failed registration', () => {
    cy.visit('/register')
    cy.get('#name').type('John Doe')
    cy.get('#email').type('author1@example.com')
    cy.get('#password').type('password1')
    cy.get('#password_confirmation').type('password')
    cy.contains('button', 'Submit').click()
    cy.contains('li', 'The email has already been taken.')
  })

})
