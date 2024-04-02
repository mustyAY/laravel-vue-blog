describe('post tests', () => {
    it('can view post', () => {
        cy.visit('/');
        cy.contains('a', 'Login');
        cy.get('[data-cy="36"]').click();
        cy.url().should('include', '36');
    })
})