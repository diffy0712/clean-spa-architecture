import { act } from 'react-test-renderer';
import { IsIn, MinLength } from 'class-validator';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { makeObservable, observable } from 'mobx';
import Checkbox from '@System/Components/FormControl/Checkbox/Checkbox';
import Input from '@System/Components/FormControl/Input/Input';
import BindValidationModel from '@System/Components/BindModel/BindValidationModel';
import { createValidationProxy } from '@System/Models/ValidationProxy';

class ValidModel {
	@observable
	@MinLength(5)
	name = '';

	@observable
	@IsIn([true], { message: 'You must an adult!' })
	adult = false;

	constructor() {
		makeObservable(this);
	}
}

describe('BindValidationModel test suite', () => {
	test('Can render BindValidationModel component', async () => {
		const model = createValidationProxy(new ValidModel());

		const { getByTestId } = render(
			<>
				<BindValidationModel model={model} property="name">
					<Input data-testid="testInput" label="Test" />
				</BindValidationModel>
				<BindValidationModel model={model} property="adult">
					<Checkbox data-testid="testAdult" label="Is Adult?" />
				</BindValidationModel>
			</>
		);

		expect(model.isValid()).toBeFalsy();
		expect(model.errors.all.length).toEqual(2);

		const inputElement = getByTestId('testInput').querySelector(
			'input'
		) as HTMLInputElement;
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
