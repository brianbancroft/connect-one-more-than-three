import React from "react";
import { describe, expect, it } from "vitest";
import "@testing-library/jest-dom/extend-expect";

import { render, fireEvent, within, screen } from "@testing-library/react";

import ActiveGame from "./ActiveGame";

describe("The board game", () => {
  it("loads", () => {
    render(<ActiveGame />);
  });

  it("has seven load buttons", async () => {
    render(<ActiveGame />);

    const loadButtons = await screen.getAllByRole("button", {
      name: "drop-token",
    });

    expect(loadButtons.length).toBe(7);
  });

  it("has no tokens present", async () => {
    render(<ActiveGame />);

    const redTokens = await screen.queryAllByText("token-red");
    const blueTokens = await screen.queryAllByText("token-blue");

    expect([...redTokens, ...blueTokens].length).toBe(0);
  });

  it("should start with player 1", () => {
    render(<ActiveGame />);

    const playerGroup = screen.getByText("Player 1").closest("div");

    within(playerGroup).getByText("your turn");
  });
});

describe("On pressing a column button for the first time", () => {
  it("Changes turn", async () => {
    render(<ActiveGame />);
    const loadButtons = await screen.getAllByRole("button", {
      name: "drop-token",
    });

    fireEvent(
      loadButtons[0],
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );

    const playerGroup = screen.getByText("Player 2").closest("div");

    within(playerGroup).getByText("your turn");
  });
});

describe("On pressing a column button seven times in succession", () => {
  it("disables that button", async () => {
    render(<ActiveGame />);
    const loadButtons = await screen.getAllByRole("button", {
      name: "drop-token",
    });
    fireEvent(
      loadButtons[0],
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );
    fireEvent(
      loadButtons[0],
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );
    fireEvent(
      loadButtons[0],
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );
    fireEvent(
      loadButtons[0],
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );
    fireEvent(
      loadButtons[0],
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );
    fireEvent(
      loadButtons[0],
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );
    fireEvent(
      loadButtons[0],
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );

    expect(loadButtons[0]).toBeDisabled();
  });
});

describe("Basic win condition", () => {
  it("detects victory for a P1 vertical four in a row", async () => {
    render(<ActiveGame />);
    const loadButtons = await screen.getAllByRole("button", {
      name: "drop-token",
    });
    fireEvent(
      loadButtons[0],
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );
    fireEvent(
      loadButtons[5],
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );
    fireEvent(
      loadButtons[0],
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );
    fireEvent(
      loadButtons[5],
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );
    fireEvent(
      loadButtons[0],
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );
    fireEvent(
      loadButtons[5],
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );
    fireEvent(
      loadButtons[0],
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );

    expect(loadButtons[0]).toBeDisabled();

    expect(screen.queryByText("player 1 wins!")).toBeInTheDocument();
    expect(screen.queryByText("player 2 wins!")).not.toBeInTheDocument();
  });
});
