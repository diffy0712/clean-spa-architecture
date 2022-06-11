import { Expose } from 'class-transformer';
import { IsEmail, IsIn, MinLength } from 'class-validator';
import { makeObservable, observable } from 'mobx';
import BaseSerializableModel from '../../../System/Models/BaseSerializableModel';

class ContactVMForm extends BaseSerializableModel {
	@observable
	@Expose()
	@IsEmail({ message: 'Not a valid email' })
	email = '';

	@observable
	@Expose({ name: 'full_name' })
	@MinLength(1)
	fullName = '';

	@observable
	@Expose()
	message = '';

	@observable
	@Expose()
	@IsIn([true], { message: 'You must accept terms and contidions!' })
	termsAndConditionsAccepted = false;

	constructor() {
		super();
		makeObservable(this);
	}
}

export default ContactVMForm;
