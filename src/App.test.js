import { cleanup, render, screen } from "@testing-library/react";
import App from "./App";

afterEach(cleanup);

test("should take a snapshot", () => {
  const { asFragment } = render(<App />);
  expect(asFragment(<App />)).toMatchSnapshot();
});

test("renders copy markdown button", () => {
  render(<App />);
  const linkElement = screen.getByText(/copy markdown/i);
  expect(linkElement).toBeInTheDocument();
});
