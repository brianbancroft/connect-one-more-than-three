describe("example to-do app", () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit("//localhost:3000");
  });

  it("displays the proper elements on initial load", () => {
    cy.findByText("connect three plus one");
    cy.findByText(
      /connect three plus one is based on the game of a similar name/
    );

    // expect(screen.getByText("Click Me").closest("a")).toHaveAttribute(
    //   "href",
    //   "https://www.test.com/"
    // );

    cy.findByText("View on Github")
      .closest("a")
      .should(
        "have.attr",
        "href",
        "https://github.com/brianbancroft/connect-one-more-than-three"
      );
  });

  it("Starts the game when start game pressed", () => {
    cy.findByText("start game").click();

    cy.findByText(/Player 1/).should("exist");
    cy.findByText(/Player 2/).should("exist");
  });

  it("plays a game as expected", () => {
    cy.findByText("start game").click();
    cy.findAllByRole("button").then(async (buttons) => {
      const [column1, column2, column3, column4, column5, column6, column7] =
        buttons;

      column1.click();

      cy.findByText(/Player 2/).should("have.css", "color", "rgb(220, 38, 38)");
      await cy.wait(50);
      column7.click();
      await cy.wait(50);
      column1.click();
      await cy.wait(50);
      column7.click();
      await cy.wait(50);
      column1.click();
      await cy.wait(50);
      column7.click();
      await cy.wait(50);
      column1.click();
      await cy.wait(50);

      cy.findByText(/player 1 wins/).should("exist");
    });
  });
});
