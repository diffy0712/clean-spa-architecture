import { makeObservable, observable } from 'mobx';
import { createProxyModel } from '@System/Models/ProxyModel';

class InValidModel {
	name = '';
}

class ValidModel {
	@observable
	name = '';

	constructor() {
		makeObservable(this);
	}
}

describe('Test Proxy', () => {
	test('Cannot Create Validation model on not observable model.', () => {
		const inValidModel = new InValidModel();
		expect(() => createProxyModel(inValidModel)).toThrow(
			'createViewModel expects an observable object'
		);
	});

	test('Can Create Validation model', () => {
		const validModel = new ValidModel();
		expect(() => createProxyModel(validModel)).not.toThrow(
			'createViewModel expects an observable object'
		);
	});
});
