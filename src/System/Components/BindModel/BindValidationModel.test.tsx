import Input from "../FormControl/Input/Input";
import { fireEvent, getByTestId, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { makeObservable, observable } from "mobx";
import Checkbox from "../FormControl/Checkbox/Checkbox";
import { IsIn, MinLength } from "class-validator";
import BindValidationModel from "./BindValidationModel";
import { createValidationProxy } from "../../Models/ValidationProxy";
import { act } from "react-test-renderer";

class ValidModel {
  @observable
  @MinLength(5)
  name: string = "";

  @observable
  @IsIn([true], { message: 'You must an adult!' })
  adult: boolean = false;

  constructor() {
      makeObservable(this);
  }
}

describe("BindValidationModel test suite", () => {

  test("Can render BindValidationModel component", async () => {
    const model = createValidationProxy(new ValidModel());

    const { getByTestId } = render(<>
      <BindValidationModel model={model} property="name">
        <Input data-testid="testInput" label="Test" />
      </BindValidationModel>
      <BindValidationModel model={model} property="adult">
        <Checkbox data-testid="testAdult" label="Is Adult?" />
      </BindValidationModel>
    </>);

    expect(model.isValid()).toBeFalsy();
    expect(model.errors.all.length).toEqual(2);

    const inputElement = getByTestId('testInput').querySelector('input') as HTMLInputElement;
    expect(model.name).toBe('');

    act(() => {
      userEvent.type(inputElement, 'test', { delay: 2 });
    });
    await new Promise((r) => setTimeout(r, 400));
    expect(model.name).toEqual('test');
    expect(inputElement.value).toEqual('test');

    // todo: check if errors are passed down to inputs

    // expect(model.isValid()).toBeFalsy();
    // expect(model.hasPropertyError('name')).toBeFalsy();
    // expect(model.hasPropertyError('adult')).toBeTruthy();

    // const customElement = getByTestId('testAdult') as HTMLDivElement;
    // fireEvent.click(customElement);
    // expect(customElement).toBeTruthy();

    // fireEvent.click(customElement!);
    // expect(model.adult).toBeFalsy();
  });
});