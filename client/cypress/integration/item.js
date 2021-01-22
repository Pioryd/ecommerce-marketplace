describe("Item", () => {
  beforeEach(() => {
    cy.signIn();

    cy.visit(Cypress.env("HOST") + "/");
    cy.wait(500);
  });

  it("View", () => {
    cy.get("[class=q7l_item]").first().click();
    cy.wait(500);

    cy.get("[class=h2n_price]").invoke("text").should("include", "Price: ");

    cy.get(".h2n_description").should("exist");
    cy.get(".h2n_title").should("exist");
    cy.get(".h2n_toggle-watch").should("exist");
    cy.get(".h2n_add-to-cart").should("exist");
    cy.get(".h2n_buy").should("exist");
  });
});
