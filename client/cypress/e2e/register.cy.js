describe('Register tests', () => {
  it('visits the register page', () => {
    cy.visit('/register')
    cy.contains('h1', 'Register!')
  })

  it('registers successfully', () => {
    cy.visit('/register')
    cy.get('#name').type('Jack Doe')
    cy.get('#email').type('jack@example.com')
    cy.get('#password').type('password')
    cy.get('#password_confirmation').type('password')
    cy.contains('button', 'Submit').click()
    cy.contains('h1', 'Blog Posts')
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
