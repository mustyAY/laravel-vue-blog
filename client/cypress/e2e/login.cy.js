describe('Login tests', () => {
    it('visits the login page', () => {
      cy.visit('/login')
      cy.contains('h1', 'Log In!')
    })
  
    it('logs in successfully', () => {
        cy.visit('/login')
        cy.get('#email').type("author1@example.com")
        cy.get('#password').type("password")
        cy.contains('button', 'Log In').click()
        cy.contains('h1', 'Blog Posts')
    })
  
  })
  