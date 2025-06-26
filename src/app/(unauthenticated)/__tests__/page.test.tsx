import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import Page from "../page";

describe("Page", () => {
  it("renders the Next.js logo heading", () => {
    render(<Page />);

    const image = screen.getByAltText("Next.js logo");
    expect(image).toBeInTheDocument();
  });

  it("contains login and dashboard links", () => {
    render(<Page />);

    const loginLink = screen.getByRole("link", { name: /login/i });
    const dashboardLink = screen.getByRole("link", { name: /dashboard/i });

    expect(loginLink).toBeInTheDocument();
    expect(dashboardLink).toBeInTheDocument();
  });
});
