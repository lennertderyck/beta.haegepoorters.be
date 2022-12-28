import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import ControlledForm from "../ControlledForm";

test("Render ControlledForm", () => {
  render(<ControlledForm>Form title</ControlledForm>);

  // test if form is rendered
  const formElement = screen.getByText("Form title");
  expect(formElement).toBeInTheDocument();
});

test("Submit on ControlledForm", async () => {
  const mockFct = jest.fn();
  render(
    <ControlledForm
      onSubmit={() => {
        mockFct();
      }}>
      Test form
      <button data-testid="testSubmit" type="submit">
        Submit
      </button>
    </ControlledForm>
  );

  // test if form is rendered
  const formSubmitElement = screen.getByTestId("testSubmit");
  expect(formSubmitElement).toBeInTheDocument();

  fireEvent.click(formSubmitElement);
  await waitFor(() => {
    expect(mockFct).toHaveBeenCalledTimes(1);
  });
});
