import { fireEvent, render } from '@testing-library/react';
import { makeObservable, observable } from 'mobx';
import { IsIn } from 'class-validator';
import { FC } from 'react';
import userEvent from '@testing-library/user-event';
import BindModel from '@System/Components/BindModel/BindModel';
import Input from '@System/Components/FormControl/Input/Input';
import TrimDataTransformer from '@System/DataTransformers/TrimDataTransformer';
import DataTransformerInterface from '@System/DataTransformers/DataTransformerInterface';
import Checkbox from '@System/Components/FormControl/Checkbox/Checkbox';
import ControlledModelProps from '@System/Components/Props/ControlledModelProps';
import { sleep } from '@System/Utils/async';

class ValidModel {
	@observable
	_name = '';

	get name(): string {
		return this._name;
	}

	set name(value: string) {
		this._name = value;
	}

	@observable
	@IsIn([true], { message: 'You must an adult!' })
	adult = false;

	@observable
	protected _license = '';

	get license(): string {
		return this._license;
	}

	setLicense(value: string): void {
		this._license = value;
		this.adult = true;
	}

	constructor() {
		makeObservable(this);
	}
}

describe('BindModel test suite', () => {
	test('Can render BindModel component', async () => {
		const model = new ValidModel();

		const { getByTestId } = render(
			<BindModel
				model={model}
				property="name"
				extraProps={{ variant: 'solid' }}
			>
				<Input data-testid="testInput" label="Test" />
			</BindModel>
		);

		const inputElement = getByTestId('testInput').querySelector(
			'input'
		) as HTMLInputElement;
		await userEvent.type(inputElement, 'test', { delay: 2 });
		await sleep(200);
		expect(model.name).toEqual('test');
		expect(inputElement.value).toEqual('test');
	});

	test('Uses data transofmer', async () => {
		const model = new ValidModel();

		const transformToInSpy = jest.spyOn(TrimDataTransformer, 'transformToIn');
		const transformToOutSpy = jest.spyOn(TrimDataTransformer, 'transformToOut');

		transformToInSpy.mockClear();
		transformToOutSpy.mockClear();

		const { getByTestId } = render(
			<BindModel
				model={model}
				property="name"
				dataTransformers={[TrimDataTransformer]}
			>
				<Input data-testid="testInput" label="Test" />
			</BindModel>
		);

		const inputElement = getByTestId('testInput').querySelector(
			'input'
		) as HTMLInputElement;

		userEvent.type(inputElement, '  test', { delay: 2 });
		await sleep(150);
		expect(model.name).toEqual('test');
		expect(inputElement.value).toEqual('test');

		expect(transformToInSpy).toBeCalledTimes(5);
		expect(transformToOutSpy).toBeCalledTimes(6);
	});

	test('Uses multiple data transofmers in correct order', async () => {
		const model = new ValidModel();

		class TestingDataTransformer
			implements DataTransformerInterface<string, string>
		{
			constructor(protected symbol: string) {}

			transformToIn(newValue: string | null | undefined): string {
				return newValue || '';
			}
			transformToOut(newValue: string | null | undefined): string {
				return (newValue || '') + this.symbol;
			}
		}

		const { getByTestId } = render(
			<BindModel
				model={model}
				property="name"
				dataTransformers={[
					new TestingDataTransformer('3'),
					new TestingDataTransformer('2'),
					new TestingDataTransformer('1'),
				]}
			>
				<Input data-testid="testInput" label="Test" />
			</BindModel>
		);

		const inputElement = getByTestId('testInput').querySelector(
			'input'
		) as HTMLInputElement;

		await userEvent.type(inputElement, 't');
		await sleep(150);
		expect(model.name).toEqual('t321');
	});

	test('Works with checkbox input', async () => {
		const model = new ValidModel();

		const { getByTestId } = render(
			<BindModel model={model} property="adult">
				<Checkbox data-testid="testInput" label="Is Adult?" />
			</BindModel>
		);

		const checkboxElement = getByTestId('testInput').querySelector(
			'input'
		) as HTMLInputElement;

		fireEvent.click(checkboxElement);
		expect(model.adult).toBeTruthy();

		fireEvent.click(checkboxElement);
		expect(model.adult).toBeFalsy();
	});

	test('Works with object', async () => {
		const model = new ValidModel();

		const ControllerComponent: FC<
			ControlledModelProps<boolean> &
				React.DetailedHTMLProps<
					React.HTMLAttributes<HTMLDivElement>,
					HTMLDivElement
				>
		> = ({ onChange, value, ...props }) => (
			<div onClick={() => onChange?.(!!value)} {...props}>
				{value ? 'true' : 'false'}
			</div>
		);

		const { getByTestId } = render(
			<BindModel model={model} property="adult">
				<ControllerComponent data-testid="testInput" />
			</BindModel>
		);

		const customElement = getByTestId('testInput') as HTMLDivElement;

		fireEvent.click(customElement);
		expect(customElement).toBeTruthy();

		fireEvent.click(customElement);
		expect(model.adult).toBeFalsy();
	});

	test('Calling setter', async () => {
		const model = new ValidModel();
		const setterMock = jest.spyOn(model, 'setLicense');

		const { getByTestId } = render(
			<BindModel model={model} property="license" setter="setLicense">
				<Input data-testid="testInput" />
			</BindModel>
		);

		const inputElement = getByTestId('testInput').querySelector(
			'input'
		) as HTMLInputElement;
		await userEvent.type(inputElement, 'test', { delay: 2 });
		await new Promise((r) => setTimeout(r, 300));
		expect(model.license).toEqual('test');
		expect(inputElement.value).toEqual('test');

		expect(setterMock).toBeCalledTimes(4);
		expect(setterMock).toBeCalledWith('test');
	});

	test('Calls afterChange', async () => {
		const model = new ValidModel();
		const afterChangeMock = jest.fn(() => true);

		const { getByTestId } = render(
			<BindModel model={model} property="name" afterChange={afterChangeMock}>
				<Input data-testid="testInput" />
			</BindModel>
		);

		const inputElement = getByTestId('testInput').querySelector(
			'input'
		) as HTMLInputElement;
		await userEvent.type(inputElement, 'test', { delay: 2 });
		await sleep(300);
		expect(model.name).toEqual('test');
		expect(inputElement.value).toEqual('test');

		expect(afterChangeMock).toBeCalledTimes(4);
	});
});
