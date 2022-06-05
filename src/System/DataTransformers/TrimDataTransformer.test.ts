import TrimDataTransformer from "./TrimDataTransformer";

afterEach(() => {
  jest.resetAllMocks();
});

test("Trim To In - should Not Change", () => {
  const inValue: string = "test should not  change to IN";
  expect(TrimDataTransformer.transformToIn(inValue)).toEqual(inValue);
});

test("Trim To In - should Not Change With Trailing Spaces", () => {
  const inValue: string = "  test should not  change to IN  ";
  expect(TrimDataTransformer.transformToIn(inValue)).toEqual(inValue);
});

test("Trim To Out should Not Change", () => {
  const outValue: string = "test should not  change to IN";

  expect(TrimDataTransformer.transformToOut(outValue)).toEqual(outValue);
});

test("Trim To In - should Change With Trailing Spaces", () => {
  const outValue: string = "  test should not  change to IN  ";
  expect(TrimDataTransformer.transformToOut(outValue)).toEqual(
    "test should not  change to IN  "
  );
});
