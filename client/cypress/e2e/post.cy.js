describe('post tests', () => {
    it('can view post', () => {
        cy.visit('/');
        cy.contains('a', 'Login');
        cy.get('[data-cy="3"]').click();
        cy.url().should('include', '3');
    })
})