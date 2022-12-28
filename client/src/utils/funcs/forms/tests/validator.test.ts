import { numberTypeValueIsNotNaN } from "../validators";

test("numberTypeValueIsNotNaN", () => {
  const test = numberTypeValueIsNotNaN("string");
  expect(test).toBeTruthy();

  const testNumber = numberTypeValueIsNotNaN("number");
  const numberResult = testNumber("3");
  const textResult = testNumber("a");
  expect(numberResult).toBeTruthy();
  expect(textResult).toBeFalsy();
});
