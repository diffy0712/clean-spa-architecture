import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { createValidationProxy } from './ValidationProxy';

class ValidModel {
	@MinLength(2, { message: 'Name must be at least 2 characters long!' })
	name = '';

	@IsEmail({}, { message: 'Not valid email format!' })
	email = '';
}

class GroupModel {
	@MinLength(2, {
		message: 'Name must be at least 2 characters long!',
		groups: ['advanced'],
	})
	@IsNotEmpty({ message: 'Must provide a name!', groups: ['simple'] })
	name = '';

	@IsEmail({}, { message: 'Not valid email format!' })
	email = '';
}

describe('Test ValidationModel', () => {
	test('Can Create Validation model', () => {
		const model = new ValidModel();
		expect(() => createValidationProxy(model)).not.toThrow();
	});

	test('Can Create Validation model with groups', () => {
		const model = new GroupModel();
		expect(() => createValidationProxy(model)).not.toThrow();
	});

	test('Can modify property', () => {
		const model = createValidationProxy(new ValidModel());
		expect(model.name).toEqual('');

		model.name = 'Test name';
		expect(model.name).toEqual('Test name');
	});

	test('Can modify property for group', () => {
		const model = createValidationProxy(new ValidModel());
		expect(model.name).toEqual('');

		model.name = 'Test name';
		expect(model.name).toEqual('Test name');

		model.email = 'test@email.com';
		expect(model.email).toEqual('test@email.com');
	});

	test('Has properties and methods', () => {
		const model = createValidationProxy(new ValidModel());
		expect(typeof model.errors).toEqual('object');
		expect(typeof model.getPropertyErrors).toEqual('function');
		expect(typeof model.hasPropertyError).toEqual('function');
		expect(typeof model.validate).toEqual('function');
		expect(typeof model.isValid).toEqual('function');
	});

	test('Validate on property set should produce error', () => {
		const model = createValidationProxy(new ValidModel());
		// since we dont use groups yet. errors hould only have the all group
		expect(Object.keys(model.errors).length).toEqual(1);
		expect(model.errors.all.length).toEqual(2);

		model.name = 'T';
		model.email = 'example{at}example.com';
		expect(model.errors.all.length).toEqual(2);
	});

	test('Validate on property set should produce error with groups', () => {
		const model = createValidationProxy(new GroupModel(), [
			'simple',
			'advanced',
		]);
		// Should have: all, advanced, simple
		expect(Object.keys(model.errors).length).toEqual(3);
		expect(model.errors.all.length).toEqual(2);
		expect(model.errors.advanced.length).toEqual(1);
		expect(model.errors.simple.length).toEqual(1);

		model.name = 'T';
		expect(Object.keys(model.errors).length).toEqual(3);
		expect(model.errors.all.length).toEqual(2);
		expect(model.errors.advanced.length).toEqual(1);
		expect(model.errors.simple.length).toEqual(0);
	});

	test('Validate on property set should not produce error', () => {
		const model = createValidationProxy(new GroupModel(), [
			'simple',
			'advanced',
		]);
		expect(Object.keys(model.errors).length).toEqual(3);

		model.name = 'Test Name';
		expect(model.errors.all.length).toEqual(1);
		expect(model.errors.advanced.length).toEqual(0);
		expect(model.errors.simple.length).toEqual(0);

		model.email = 'example@example.com';
		expect(model.errors.all.length).toEqual(0);
		expect(model.errors.advanced.length).toEqual(0);
		expect(model.errors.simple.length).toEqual(0);
	});

	test('Is valid works with no groups', () => {
		const model = createValidationProxy(new ValidModel());
		expect(model.isValid()).toBeFalsy();

		model.name = 'Test Name';
		expect(model.isValid()).toBeFalsy();

		model.email = 'example@example.com';
		expect(model.isValid()).toBeTruthy();
	});

	test('Is valid works with groups', () => {
		const model = createValidationProxy(new GroupModel(), [
			'simple',
			'advanced',
		]);
		expect(model.isValid()).toBeFalsy();
		expect(model.isValid(['simple'])).toBeFalsy();
		expect(model.isValid(['advanced'])).toBeFalsy();

		model.name = 'T';
		expect(model.isValid()).toBeFalsy();
		expect(model.isValid(['simple'])).toBeTruthy();
		expect(model.isValid(['advanced'])).toBeFalsy();

		model.name = 'Test';
		expect(model.isValid()).toBeFalsy();
		expect(model.isValid(['simple'])).toBeTruthy();
		expect(model.isValid(['advanced'])).toBeTruthy();

		model.email = 'example@example.com';
		expect(model.isValid()).toBeTruthy();
		expect(model.isValid(['simple'])).toBeTruthy();
		expect(model.isValid(['advanced'])).toBeTruthy();
	});

	test('hasPropertyError works with no groups', () => {
		const model = createValidationProxy(new ValidModel());
		expect(model.hasPropertyError('name')).toBeTruthy();
		expect(model.hasPropertyError('email')).toBeTruthy();

		model.name = 'Test Name';
		expect(model.hasPropertyError('name')).toBeFalsy();
		expect(model.hasPropertyError('email')).toBeTruthy();

		model.email = 'example@example.com';
		expect(model.hasPropertyError('name')).toBeFalsy();
		expect(model.hasPropertyError('email')).toBeFalsy();
	});

	test('getPropertyErrors works with no groups', () => {
		const model = createValidationProxy(new ValidModel());
		expect(model.getPropertyErrors('name')).toEqual([
			'Name must be at least 2 characters long!',
		]);
		expect(model.getPropertyErrors('email')).toEqual([
			'Not valid email format!',
		]);

		model.name = 'Test Name';
		expect(model.getPropertyErrors('name')).toEqual([]);
		expect(model.getPropertyErrors('email')).toEqual([
			'Not valid email format!',
		]);

		model.email = 'example@example.com';
		expect(model.getPropertyErrors('name')).toEqual([]);
		expect(model.getPropertyErrors('email')).toEqual([]);
	});
});
