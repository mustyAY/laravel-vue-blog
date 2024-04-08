describe('post tests', () => {
  before(() => {
    cy.refreshDatabase()
  })

  it('can view post', () => {
    cy.visit('/')
    cy.contains('a', 'Login')
    cy.get('[data-cy="33"]').click()
    cy.url().should('include', '33')
  })

  it('can like post', () => {
    cy.login()
    cy.get('[data-cy="33"]').click()
    cy.intercept('http://localhost:8000/api/posts/33/like').as('likePost')
    cy.url().should('include', '33')
    cy.get('i.far.fa-heart').parent('span').click()
    cy.wait('@likePost')
    cy.get('i.fas.fa-heart').should('be.visible')
  })

  it('can unlike post', () => {
    cy.login()
    cy.get('[data-cy="33"]').click()
    cy.intercept('http://localhost:8000/api/posts/33/unlike').as('unlikePost')
    cy.url().should('include', '33')
    cy.get('i.fas.fa-heart').parent('span').click()
    cy.wait('@unlikePost')
    cy.get('i.far.fa-heart').should('be.visible')
  })

  it('subscriber cannot create post', () => {
    cy.login()
    cy.get('nav').should('not.contain.text', 'New Post')
  })

  it('author can create post', () => {
    cy.login('author')
    cy.contains('a', 'New Post').click()
    cy.contains('h1', 'Create A Post!')
    cy.get('#title').type('Author New Post')
    cy.get('#description').type('New Post Description')
    cy.get('#body').type('New Post Body')
    cy.get('#status').select('published')
    cy.contains('button', 'Create Post').click()
    cy.contains('h1', 'Blog Posts')
    cy.get('[data-cy="posts"]').should('be.visible').contains('a', 'New Post').click()
    cy.contains('h1', 'New Post')
  })

  it('author cannot delete others post', () => {
    cy.login('author')
    cy.intercept('http://localhost:8000/api/posts/33').as('getPost')
    cy.get('[data-cy="33"]').click()
    cy.url().should('include', '33')
    cy.wait('@getPost')
    cy.get('main').should('not.contain.text', 'Delete Post')
  })

  it('author can delete owned post', () => {
    cy.login('author')
    cy.contains('h1', 'Blog Posts')
    cy.get('[data-cy="posts"]').should('be.visible').contains('a', 'Author New Post').click()
    cy.contains('h1', 'Author New Post')
    cy.contains('button', 'Delete Post').click()
    cy.contains('h1', 'Blog Posts')
    cy.get('[data-cy="posts"]').should('be.visible').should('not.contain', 'New Post')
  })

  it('admin can create post', () => {
    cy.login('admin')
    cy.contains('a', 'New Post').click()
    cy.contains('h1', 'Create A Post!')
    cy.get('#title').type('Admin New Post')
    cy.get('#description').type('Admin New Post Description')
    cy.get('#body').type('Admin New Post Body')
    cy.get('#status').select('published')
    cy.contains('button', 'Create Post').click()
    cy.contains('h1', 'Blog Posts')
    cy.get('[data-cy="posts"]').should('be.visible').contains('a', 'Admin New Post').click()
    cy.contains('h1', 'Admin New Post')
  })

  it('admin can delete any post', () => {
    cy.login('admin')
    cy.intercept('http://localhost:8000/api/posts/28').as('getPost')
    cy.get('[data-cy="28"]').click()
    cy.url().should('include', '28')
    cy.wait('@getPost')
    cy.contains('button', 'Delete Post').click()
    cy.intercept('http://localhost:8000/api/posts').as('getPosts')
    cy.contains('h1', 'Blog Posts')
    cy.wait('@getPosts')
    cy.get('[data-cy="28"]').should('not.exist')
  })
})
