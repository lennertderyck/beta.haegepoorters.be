import {defaultValueToNumber} from "../transformers";

test("defaultValueToNumber", () => {
  let test = defaultValueToNumber("1");
  expect(test).toBe(1);

  test = defaultValueToNumber(2);
  expect(test).toBe(2);

  test = defaultValueToNumber(undefined);
  expect(test).toBeUndefined();

  test = defaultValueToNumber(["10"]);
  expect(test).toBe(10);
});
