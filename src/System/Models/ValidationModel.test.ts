import { makeObservable, observable } from "mobx";
import { createValidationModel } from "./ValidationModel";

class InValidModel {
  name: string = "";
}

class ValidModel {
  @observable
  name: string = "";

  constructor() {
    makeObservable(this);
  }
}

describe("Test ValidationModel", () => {
  test("Cannot Create Validation model on not observable model.", () => {
    const inValidModel = new InValidModel();
    expect(() => createValidationModel(inValidModel)).toThrow(
      "ValidationModel expects an observable object"
    );
  });

  test("Can Create Validation model", () => {
    const validModel = new ValidModel();
    expect(() => createValidationModel(validModel)).not.toThrow(
      "ValidationModel expects an observable object"
    );
  });
});
