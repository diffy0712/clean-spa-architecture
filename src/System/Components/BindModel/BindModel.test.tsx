import { act } from "react-test-renderer";
import { fireEvent, getByTestId, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BindModel from "./BindModel";
import Input from "../FormControl/Input/Input";
import { makeObservable, observable } from "mobx";
import TrimDataTransformer from "../../DataTransformers/TrimDataTransformer";

class ValidModel {
  @observable
  name: string = "";

  constructor() {
      makeObservable(this);
  }
}

test("Can render BindModel component", async () => {
  const model = new ValidModel();

  const { getByTestId } = render(<BindModel model={model} property="name" extraProps={{variant: 'solid'}}>
    <Input data-testid="testInput" label="Test" />
  </BindModel>);

  const inputElement = getByTestId('testInput').querySelector('input') as HTMLInputElement;
  userEvent.type(inputElement, 'test', { delay: 2 });
  await new Promise((r) => setTimeout(r, 300));
  expect(model.name).toEqual('test');
  expect(inputElement.value).toEqual('test');
});


test("Uses data transofmer", async () => {
  const model = new ValidModel();

  const transformToInSpy = jest.spyOn(TrimDataTransformer, 'transformToIn');
  const transformToOutSpy = jest.spyOn(TrimDataTransformer, 'transformToOut');

  transformToInSpy.mockClear();
  transformToOutSpy.mockClear();

  const { getByTestId } = render(<BindModel model={model} property="name" dataTransformers={[TrimDataTransformer]}>
    <Input data-testid="testInput" label="Test" />
  </BindModel>);

  const inputElement = getByTestId('testInput').querySelector('input') as HTMLInputElement;
  userEvent.type(inputElement, '  test', { delay: 2 });
  await new Promise((r) => setTimeout(r, 300));
  expect(model.name).toEqual('test');
  expect(inputElement.value).toEqual('test');
 
  // FIXME: why do the toIn runs onyl 5 times?
  expect(transformToInSpy).toBeCalledTimes(5);
  expect(transformToOutSpy).toBeCalledTimes(6);
});
