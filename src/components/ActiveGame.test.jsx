import React from "react";
import { describe, expect, it } from "vitest";

import { render, fireEvent, waitFor, screen } from "@testing-library/react";

import ActiveGame from "./ActiveGame";

describe("The board game", () => {
  it("loads", async () => {
    render(<ActiveGame />);
  });
});
