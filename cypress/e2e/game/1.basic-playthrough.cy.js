import boardElements from "../../constants/boardElements";

const test = it;

describe("Basic playthrough (vertical orientation)", () => {
  before(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit("//localhost:3000");
  });

  test("displays the proper elements on initial load", async () => {
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

  // Token names appear under the dom tree as text, but are hidden through CSS

  test("game indicates that player 1 goes first", () => {
    // Player 1 goes first

    const element = cy.findByText(boardElements.player1.name);
    element.should("exist");

    element.should("have.css", "color", boardElements.player1.activeColor);
  });

  test("game adds piece when user clicks first column", async () => {
    await cy.findAllByRole("button").then(async (buttons) => {
      const [column1] = buttons;
      await column1.click();

      cy.findAllByText(boardElements.player1.tokenLabel).should(
        "have.length",
        1
      );
      cy.findAllByText(boardElements.player2.tokenLabel).should(
        "have.length",
        0
      );
      cy.findAllByText(boardElements.inactiveSlotName).should(
        "have.length",
        boardElements.numberSlots - 1
      );
      cy.findByText(boardElements.player1.name).should(
        "have.css",
        "color",
        boardElements.cssInactiveColor
      );

      cy.findByText(boardElements.player2.name).should(
        "have.css",
        "color",
        boardElements.player2.activeColor
      );
    });
  });

  test("game adds second piece when user then clicks last column", async () => {
    const buttons = await cy.findAllByRole("button");

    const [, , , , , , column7] = buttons;
    column7.click();

    cy.findAllByText(boardElements.player1.tokenLabel).should("have.length", 1);
    cy.findAllByText(boardElements.player2.tokenLabel).should("have.length", 1);
    cy.findAllByText(boardElements.inactiveSlotName).should(
      "have.length",
      boardElements.numberSlots - 2
    );
    cy.findByText(boardElements.player1.name).should(
      "have.css",
      "color",
      boardElements.player1.activeColor
    );
    cy.findByText(boardElements.player2.name).should(
      "have.css",
      "color",
      boardElements.cssInactiveColor
    );
  });

  describe("when adding seven pieces alternative between first and last column", () => {
    before(() => {
      // triggers seven clicks in addition to the existing two
      cy.findAllByRole("button").then(async (buttons) => {
        const [column1, , , , , , column7] = buttons;
        await column1.click();
        await column7.click();
        await column1.click();
        await column7.click();
        await column1.click();
      });
    });

    test("only seven items are present on the board", () => {
      cy.findAllByText(boardElements.player1.tokenLabel).should(
        "have.length",
        4
      );
      cy.findAllByText(boardElements.player2.tokenLabel).should(
        "have.length",
        3
      );
      cy.findAllByText(boardElements.inactiveSlotName).should(
        "have.length",
        boardElements.numberSlots - 7
      );
    });
    test("winning text should be present", () => {
      cy.findByText(/player 1 wins/).should("exist");
      cy.findByText(/player 1 wins/).should(
        "have.css",
        "color",
        boardElements.player1.activeColor
      );
    });

    test("both player indicators should be set to inactive", async () => {
      cy.findByText(boardElements.player1.name).should(
        "have.css",
        "color",
        boardElements.player1.activeColor
      );
      cy.findByText(boardElements.player2.name).should(
        "have.css",
        "color",
        boardElements.cssInactiveColor
      );
    });
  });
});
