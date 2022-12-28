import {fireEvent, render, screen} from "@testing-library/react";
import DatalistInput from "../DatalistInput";

test("Render DatalistInput", () => {
  render(<DatalistInput name="test" list={["first", "second", "third"]} />);
  fireEvent.keyDown(screen.getByTestId("datalistInput"), {key: "Escape", code: "Escape", keyCode: 27, charCode: 27});
});
