import { act } from "react-test-renderer";
import { fireEvent, getByTestId, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BindModel from "./BindModel";
import Input from "../FormControl/Input/Input";
import { makeObservable, observable } from "mobx";
import TrimDataTransformer from "../../DataTransformers/TrimDataTransformer";
import Checkbox from "../FormControl/Checkbox/Checkbox";
import { IsIn } from "class-validator";
import { FC } from "react";
import ControlledModelProps from "../Props/ControlledModelProps";

class ValidModel {
  @observable
  name: string = "";

  @observable
  @IsIn([true], { message: 'You must an adult!' })
  adult: boolean = false;

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


test("Works with checkbox input", async () => {
  const model = new ValidModel();

  const { getByTestId } = render(<BindModel model={model} property="adult">
    <Checkbox data-testid="testInput" label="Is Adult?" />
  </BindModel>);

  const checkboxElement = getByTestId('testInput').querySelector('input') as HTMLInputElement;
  
  act(() => {
    fireEvent.click(checkboxElement)
  });
  expect(checkboxElement).toBeTruthy();

  act(() => {
    fireEvent.click(checkboxElement);
  });
  expect(model.adult).toBeFalsy();
});


test("Works with object", async () => {
  const model = new ValidModel();

  const ControllerComponent: FC<ControlledModelProps<boolean> & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = ({onChange, value, ...props}) => (
    <div onClick={() => onChange?.(!!value)} {...props}>
      {value ? 'true' : 'false'}
    </div>
  );

  const { getByTestId } = render(<BindModel model={model} property="adult">
    <ControllerComponent data-testid="testInput" />
  </BindModel>);

  const customElement = getByTestId('testInput') as HTMLDivElement;
  
  act(() => {
    fireEvent.click(customElement)
  });
  expect(customElement).toBeTruthy();

  act(() => {
    userEvent.click(customElement!);
  });
  expect(model.adult).toBeFalsy();
});