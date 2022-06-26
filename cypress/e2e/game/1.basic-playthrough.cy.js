const test = it;

describe("Basic playthrough (vertical orientation)", () => {
  before(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit("//localhost:3000");
  });

  test("displays the proper elements on initial load", () => {
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

  test("Starts the game when start game pressed", () => {
    cy.findByText("start game").click();

    cy.findByText(/Player 1/).should("exist");
    cy.findByText(/Player 2/).should("exist");
  });

  const player1Label = /Player 1/;
  const player2Label = /Player 2/;
  const cssRed = "rgb(220, 38, 38)";
  const cssBlue = "rgb(37, 99, 235)";
  const cssPlayerNotActive = "#000000"; // Default black color

  // Token names appear under the dom tree as text, but are hidden through CSS
  const tokenBlueText = /token-blue/;
  const tokenRedText = /token-red/;
  const noTokenText = /no-token/;

  const numberSlots = 42;

  test("game indicates that player 1 goes first", async () => {
    await cy.wait(50);
    // Player 1 goes first
    cy.findByText(player1Label).should("have.css", "color", cssBlue);
  });

  test("game adds piece when user clicks first column", async () => {
    const buttons = await cy.findAllByRole("button");

    const [column1, column2, column3, column4, column5, column6, column7] =
      buttons;
    column1.click();

    cy.findAllByText(tokenBlueText).should("have.length", 1);
    cy.findAllByText(tokenRedText).should("have.length", 0);
    cy.findAllByText(noTokenText).should("have.length", numberSlots - 1);
    cy.findByText(player1Label).should("have.css", "color", cssPlayerNotActive);

    cy.findByText(player2Label).should("have.css", "color", cssRed);
  });

  test("game adds second piece when user then clicks last column", async () => {
    const buttons = await cy.findAllByRole("button");

    const [column1, column2, column3, column4, column5, column6, column7] =
      buttons;
    column7.click();

    cy.findAllByText(tokenBlueText).should("have.length", 1);
    cy.findAllByText(tokenRedText).should("have.length", 1);
    cy.findAllByText(noTokenText).should("have.length", numberSlots - 2);
    cy.findByText(player1Label).should("have.css", "color", cssBlue);
    cy.findByText(player2Label).should("have.css", "color", cssPlayerNotActive);
  });

  describe("when adding five pieces alternative between first and last column", () => {
    test("can add five more items", async () => {
      const buttons = await cy.findAllByRole("button");

      const [column1, column2, column3, column4, column5, column6, column7] =
        buttons;
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
    });

    test("winning text should be present", () => {
      cy.findByText(/player 1 wins/).should("exist");
      cy.findByText(/player 1 wins/).should("have.css", "color", cssBlue);
    });

    test("there should be four blue tokens, 3 red tokens and the remainder blank spaces", () => {
      cy.findAllByText(tokenBlueText).should("have.length", 4);
      cy.findAllByText(tokenRedText).should("have.length", 3);
      cy.findAllByText(noTokenText).should("have.length", numberSlots - 7);
    });

    test("both player indicators should be set to inactive", async () => {
      cy.findByText(player1Label).should("have.css", "color", cssBlue);
      cy.findByText(player2Label).should(
        "have.css",
        "color",
        cssPlayerNotActive
      );
    });
  });
});
