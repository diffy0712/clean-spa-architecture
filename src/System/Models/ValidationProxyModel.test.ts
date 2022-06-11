import { IsEmail, MinLength } from 'class-validator';
import { makeObservable, observable } from 'mobx';
import * as ProxyModel from './ProxyModel';
import * as ValidationProxy from './ValidationProxy';
import { createValidationProxyModel } from './ValidationProxyModel';

class ValidModel {
	@observable
	@MinLength(2, { message: 'Name must be at least 2 characters long!' })
	name = '';

	@observable
	@IsEmail()
	email = '';

	constructor() {
		makeObservable(this);
	}
}

describe('Test ValidationProxyModel', () => {
	test('Can Create ValidationProxyModel', () => {
		const validModel = new ValidModel();
		expect(() => createValidationProxyModel(validModel)).not.toThrow();
	});

	test('Create calls createValidationProxy and createProxyModel', () => {
		const validModel = new ValidModel();
		const createProxyModelSpy = jest.spyOn(ProxyModel, 'createProxyModel');
		const createValidationProxySpy = jest.spyOn(
			ValidationProxy,
			'createValidationProxy'
		);
		createValidationProxyModel(validModel);

		expect(createProxyModelSpy).toBeCalledTimes(1);
		expect(createValidationProxySpy).toBeCalledTimes(1);
	});

	test('Create returns object', () => {
		const validModel = new ValidModel();
		expect(createValidationProxyModel(validModel)).not.toBeNull();
	});
});
