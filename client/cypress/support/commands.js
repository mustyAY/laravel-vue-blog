// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('refreshDatabase', () => {
  cy.visit('/__cypress__/refresh_database').contains('h1', 'Refresh DB')
  cy.intercept('http://localhost:8000/api/__cypress__/refresh_database').as('refreshDB')
  cy.wait('@refreshDB')
})

Cypress.Commands.add('login', (role = null) => {
  // if (!role) role = 'subscriber'
  role ??= 'subscriber'
  let email;
  const subscriber = 'subscriber@example.com'
  const author = 'author@example.com'
  const admin = 'admin@example.com'

  switch (role) {
    case 'author': {
      email = author
      break
    }

    case 'admin': {
      email = admin
      break
    }

    default: {
      email = subscriber
    }
  }

  cy.visit('/login')
  cy.get('#email').type(email)
  cy.get('#password').type('password')
  cy.contains('button', 'Log In').click()
  cy.intercept('http://localhost:8000/api/user').as('getUser')
  cy.wait('@getUser')
  cy.contains('h1', 'Blog Posts')
  cy.contains('button', 'Log Out')
})
