// semantic preference.
const test = it;

describe("test playthrough that results in stalemate", () => {
  before(() => {
    cy.visit("//localhost:3000");

    cy.findByText("start game").click();

    cy.fillColumn();
  });

  test("the first column button is disabled", () => {
    cy.findAllByRole("button").then((buttons) => {
      const [button1] = buttons;
      expect(button1).to.have.prop("disabled", true);
    });
  });
  test("the second column button is not disabled", async () => {
    cy.findAllByRole("button").then((buttons) => {
      const [, button2] = buttons;
      expect(button2).to.have.prop("disabled", false);
    });
  });
});
