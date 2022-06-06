import { IsEmail, MinLength } from "class-validator";
import { createValidationProxy } from "./ValidationProxy";

class ValidModel {
  @MinLength(2, { message: 'Name must be at least 2 characters long!'})
  name: string = "";

  @IsEmail({}, { message: 'Not valid email format!'})
  email: string = "";
}

describe("Test ValidationModel", () => {
  test("Can Create Validation model", () => {
    const validModel = new ValidModel();
    expect(() => createValidationProxy(validModel)).not.toThrow();
  });

  test("Can modify property", () => {
    const model = createValidationProxy(new ValidModel());
    expect(model.name).toEqual('');

    model.name = 'Test name';
    expect(model.name).toEqual('Test name');
  });

  test("Has properties and methods", () => {
    const model = createValidationProxy(new ValidModel());
    expect(typeof model.errors).toEqual('object');
    expect(typeof model.getPropertyErrors).toEqual('function');
    expect(typeof model.hasPropertyError).toEqual('function');
    expect(typeof model.validate).toEqual('function');
    expect(typeof model.isValid).toEqual('function');
  });

  test("Validate on property set should produce error", () => {
    const model = createValidationProxy(new ValidModel());
    // since we dont use groups yet. errors hould only have the all group
    expect(Object.keys(model.errors).length).toEqual(1);
    expect(model.errors.all.length).toEqual(2);

    model.name = "T";
    model.email = "example{at}example.com";
    expect(model.errors.all.length).toEqual(2);
  });

  test("Validate on property set should not produce error", () => {
    const model = createValidationProxy(new ValidModel());
    // since we dont use groups yet. errors hould only have the all group
    expect(Object.keys(model.errors).length).toEqual(1);
    expect(model.errors.all.length).toEqual(2);

    model.name = "Test Name";
    expect(model.errors.all.length).toEqual(1);

    model.email = "example@example.com";
    expect(model.errors.all.length).toEqual(0);
  });

  test("Is valid works with no groups", () => {
    const model = createValidationProxy(new ValidModel());
    expect(model.isValid()).toBeFalsy();

    model.name = "Test Name";
    expect(model.isValid()).toBeFalsy();

    model.email = "example@example.com";
    expect(model.isValid()).toBeTruthy();
  });

  test("hasPropertyError works with no groups", () => {
    const model = createValidationProxy(new ValidModel());
    expect(model.hasPropertyError('name')).toBeTruthy();
    expect(model.hasPropertyError('email')).toBeTruthy();

    model.name = "Test Name";
    expect(model.hasPropertyError('name')).toBeFalsy();
    expect(model.hasPropertyError('email')).toBeTruthy();

    model.email = "example@example.com";
    expect(model.hasPropertyError('name')).toBeFalsy();
    expect(model.hasPropertyError('email')).toBeFalsy();
  });

  test("getPropertyErrors works with no groups", () => {
    const model = createValidationProxy(new ValidModel());
    expect(model.getPropertyErrors('name')).toEqual(['Name must be at least 2 characters long!']);
    expect(model.getPropertyErrors('email')).toEqual(['Not valid email format!']);

    model.name = "Test Name";
    expect(model.getPropertyErrors('name')).toEqual([]);
    expect(model.getPropertyErrors('email')).toEqual(['Not valid email format!']);

    model.email = "example@example.com";
    expect(model.getPropertyErrors('name')).toEqual([]);
    expect(model.getPropertyErrors('email')).toEqual([]);
  });
});
