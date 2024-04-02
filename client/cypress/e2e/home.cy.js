// https://on.cypress.io/api

describe('Homepage Tests', () => {
  it('visits the app root url', () => {
    cy.visit('/')
    cy.contains('h1', 'Blog Posts')
  })

  it('it displays posts', () => {
    cy.visit('/')
    cy.get('[data-cy="posts"]').should('be.visible')
  })

  it('can visit the login page', () => {
    cy.visit('/')
    cy.contains('a', 'Login').click()
    cy.contains('h1', 'Log In!')
  })

})
