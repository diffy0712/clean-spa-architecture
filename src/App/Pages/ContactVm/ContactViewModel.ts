import { makeObservable, observable } from 'mobx';
import Notifier from '@System/Models/Notifier';
import {
	createValidationProxyModel,
	ValidationProxyModel,
} from '@System/Models/ValidationProxyModel';
import { sleep } from '@System/Utils/async';
import ContactVMForm from './ContactVMForm';

export class ContactViewModelProps {
	onChange?: (value: ContactVMForm) => void = undefined;
}

class ContactViewModel {
	public contactForm: ValidationProxyModel<ContactVMForm>;

	protected notifier = Notifier;

	protected props?: ContactViewModelProps;

	@observable
	public loading = false;

	get isSubmittable(): boolean {
		return this.contactForm.isValid() && this.contactForm.isDirty;
	}

	constructor() {
		this.contactForm = createValidationProxyModel(new ContactVMForm());

		makeObservable(this);
	}

	init(props: ContactViewModelProps) {
		this.props = props;
		console.log('ContactViewModel mounted', props);
	}

	onLoadFromJson() {
		this.contactForm.fromObject({
			email: 'test@example.com',
			full_name: 'test user',
			message: 'a sample message',
			termsAndConditionsAccepted: false,
		});
	}

	onResetChanges() {
		this.contactForm.reset();
	}

	async onSubmitChanges() {
		this.loading = true;

		this.contactForm.submit();

		this.loading = false;
	}

	async onSubmitForm() {
		if (!this.isSubmittable) {
			throw Error('Should not be able to call on not submitable form.');
		}

		this.loading = true;

		await sleep(1500);

		this.contactForm.submit();

		this.notifier.notify({
			title: 'Form submitted',
			type: 'success',
		});

		this.props?.onChange?.(this.contactForm);

		this.loading = false;
	}
}

export default ContactViewModel;
