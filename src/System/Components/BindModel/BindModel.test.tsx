import { act } from 'react-test-renderer';
import { fireEvent, render } from '@testing-library/react';
import { makeObservable, observable } from 'mobx';
import { IsIn } from 'class-validator';
import { FC } from 'react';
import userEvent from '@testing-library/user-event';
import BindModel from '@System/Components/BindModel/BindModel';
import Input from '@System/Components/FormControl/Input/Input';
import TrimDataTransformer from '@System/DataTransformers/TrimDataTransformer';
import Checkbox from '@System/Components/FormControl/Checkbox/Checkbox';
import ControlledModelProps from '@System/Components/Props/ControlledModelProps';

class ValidModel {
	@observable
	name = '';

	@observable
	@IsIn([true], { message: 'You must an adult!' })
	adult = false;

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
		userEvent.type(inputElement, 'test', { delay: 2 });
		await new Promise((r) => setTimeout(r, 300));
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
		await new Promise((r) => setTimeout(r, 300));
		expect(model.name).toEqual('test');
		expect(inputElement.value).toEqual('test');

		// FIXME: why do the toIn runs onyl 5 times?
		expect(transformToInSpy).toBeCalledTimes(5);
		expect(transformToOutSpy).toBeCalledTimes(6);
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

		act(() => {
			fireEvent.click(checkboxElement);
		});
		expect(model.adult).toBeTruthy();

		act(() => {
			fireEvent.click(checkboxElement);
		});
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

		fireEvent.click(customElement!);
		expect(model.adult).toBeFalsy();
	});
});
