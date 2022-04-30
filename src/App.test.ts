import { cleanup, render, screen } from "@testing-library/react";
import App from "./App";

afterEach(cleanup);

test("should take a snapshot", () => {


  // @ts-expect-error ts-migrate(7022) FIXME: 'asFragment' implicitly has type 'any' because it ... Remove this comment to see the full error message
  const { asFragment } = render(<App />);


  // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
  expect(asFragment(<App />)).toMatchSnapshot();
});

test("renders copy markdown button", () => {


  // @ts-expect-error ts-migrate(2749) FIXME: 'App' refers to a value, but is being used as a ty... Remove this comment to see the full error message
  render(<App />);
  const linkElement = screen.getByText(/copy markdown/i);
  expect(linkElement).toBeInTheDocument();
});
