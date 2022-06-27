// semantic preference.
const test = it;

describe("test playthrough that results in stalemate", () => {
  before(() => {
    cy.visit("//localhost:3000");

    cy.findByText("start game").click();

    cy.gameplayStalemate();
  });

  test("stalemate indicator is present", async () => {
    cy.findByText("stalemate").should("be.visible");
  });
});
