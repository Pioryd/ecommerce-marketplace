describe("Cart", () => {
  beforeEach(() => {
    cy.signIn();
  });

  it("Add/Remove item", () => {
    // Add item to cart
    cy.visit(Cypress.env("HOST") + "/");
    cy.wait(500);

    cy.get("[class=q7l_item]").first().click();
    cy.wait(500);

    cy.get("[class=h2n_add-to-cart]").click();
    cy.wait(500);

    // Remove first item from cart
    cy.get(".y4k_remove").then(($elements) => $elements[0].click());
  });
});
