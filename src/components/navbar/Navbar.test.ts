import { fireEvent, render, screen } from "@testing-library/react";
import App from "../../App";

const testFileName = "testing file";

test("update filename", () => {
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
