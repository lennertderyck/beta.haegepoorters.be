import {fireEvent, render, screen} from "@testing-library/react";
import { FormProvider, useForm } from "react-hook-form";
import InputSuggestionList from "../InputSuggestionList";

test("Render InputSuggestionList", () => {
  const mockFct = jest.fn();
  const defaultValues = {};
  const Wrapper = ({ children }) => {
    const methods = useForm({ defaultValues });
    return <FormProvider {...methods}>{children}</FormProvider>;
  };

  render(
    <InputSuggestionList
      fieldName="testSuggestion"
      list={["test", "tester"]}
      onSelect={() => {
        mockFct();
      }}
    />
  , {wrapper: Wrapper});

  // test if input is rendered
  const testElement = screen.getByText("test");
  expect(testElement).toBeInTheDocument();

  fireEvent.click(testElement);
  expect(mockFct).toHaveBeenCalledTimes(1);
});
