/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";

import Home from "@/app/page";

it("Render Home Page", () => {
  render(<Home />);
  expect(screen.getByRole("heading")).toHaveTextContent("Hello World");
});
