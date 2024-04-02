
describe("Home", () => {

    it("loads", () => {
        cy.visit("/").contains("My Site")
    })
})