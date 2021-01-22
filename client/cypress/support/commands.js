Cypress.Commands.add("signIn", () => {
  cy.visit(Cypress.env("HOST") + "/account");

  cy.fixture("user").then((user) => {
    cy.get("input[id=email]").type(user.email);
    cy.get("input[id=password]").type(user.password);
  });

  cy.get("[id=signIn]").click();
  cy.wait(500);
});
