import React from "react";
import { describe, expect, it } from "vitest";

import {
  render,
  fireEvent,
  within,
  screen,
  createEvent,
} from "@testing-library/react";

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

    const myEvent = createEvent.click(loadButtons[0], { button: 2 });
    await fireEvent(loadButtons[0], myEvent);

    const playerGroup = screen.getByText("Player 2").closest("div");

    within(playerGroup).getByText("your turn");

    // expect(tokens.length).toBe(1);
  });
});
