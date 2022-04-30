import { fireEvent, render, screen } from "@testing-library/react";
import App from "../../App";

const testFileName = "testing file";

test("update filename", () => {


  // @ts-expect-error ts-migrate(2749) FIXME: 'App' refers to a value, but is being used as a ty... Remove this comment to see the full error message
  render(<App />);
  const label = screen.getByTestId("file-name-label");
  fireEvent.click(label);
  const input = screen.getByTestId("file-name-input");
  fireEvent.change(input, {
    target: {
      value: testFileName,
    },
  });
  fireEvent.keyDown(input, { key: "Enter" });
  expect(label).toHaveTextContent(testFileName);
  expect(input).not.toBeInTheDocument();
});
