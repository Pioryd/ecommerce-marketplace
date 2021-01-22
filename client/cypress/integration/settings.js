describe("Settings", () => {
  beforeEach(() => {
    cy.signIn();

    cy.visit(Cypress.env("HOST") + "/account/settings");
    cy.wait(500);
  });

  it("Details", () => {
    cy.fixture("user").then((user) => {
      cy.contains("Email: " + user.email).should("exist");
    });
  });

  it("Recover - wrong password", () => {
    cy.get("[class=a4t_info]").should("not.exist");

    cy.get("input[id=password]").type("some-wrong-password");
    cy.contains("remove").click();
    cy.wait(500);

    cy.get("[class=a4t_info]").should("exist");
  });
});
