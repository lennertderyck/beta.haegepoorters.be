export const numberTypeValueIsNotNaN = (fieldType: string) => (value: any) => {
  if (fieldType !== "number") {
    return true;
  } else {
    return !isNaN(value);
  }
};
