import {fireEvent, render, screen} from "@testing-library/react";
import Input from "../Input";

test("Render Input", () => {
  render(<Input type="text" name="testInput" data-testid="testInput" />);

  // test if input is rendered
  const inputElement = screen.getByTestId("testInput");
  expect(inputElement).toBeInTheDocument();
  fireEvent.focus(inputElement);
  fireEvent.focusOut(inputElement);
});
