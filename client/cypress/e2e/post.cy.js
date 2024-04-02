describe('post tests', () => {
    it('can view post', () => {
        cy.visit('/');
        cy.contains('a', 'Login');
        cy.get('[data-cy="36"]');
        // cy.contains('h1', 'My third post');
    })
})