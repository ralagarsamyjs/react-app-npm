import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("Dashboard Component", () => {
  test("renders heading properly", () => {
    render(<App />);
    const headingElement = screen.getByText(/NPM Package Search Directory/i);
    expect(headingElement).toBeInTheDocument();
  });

  test("renders search box properly", () => {
    render(<App />);
    const searchBoxElement = screen.getByRole("searchbox");
    expect(searchBoxElement).toBeInTheDocument();
  });

  test("renders search text properly", () => {
    render(<App />);
    const searchTextElement = screen.getByDisplayValue("lodash");
    expect(searchTextElement).toBeInTheDocument();
  });
});
