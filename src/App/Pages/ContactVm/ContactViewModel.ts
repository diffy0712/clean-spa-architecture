import { makeObservable, observable } from 'mobx';
import Notifier from '../../../System/Models/Notifier';
import {
	createValidationProxyModel,
	ValidationProxyModel,
} from '../../../System/Models/ValidationProxyModel';
import ContactVMForm from './ContactVMForm';

export class ContactViewModelProps {
	onChange?: (value: ContactVMForm) => void = undefined;
}

class ContactViewModel {
	public contactForm: ValidationProxyModel<ContactVMForm>;

	protected notifier = Notifier;

	@observable
	public loading = false;

	get isSubmittable(): boolean {
		return this.contactForm.isValid() && this.contactForm.isDirty;
	}

	constructor() {
		this.contactForm = createValidationProxyModel(new ContactVMForm());

		makeObservable(this);
	}

	init(props?: ContactViewModelProps) {
		console.log('ContactViewModel mounted', props);
	}

	update(props: ContactViewModelProps) {
		console.log('update', props);
	}

	dispose() {
		console.log('dispose');
	}

	onMessage() {
		this.notifier.notify({
			title: 'Notification message',
			type: 'success',
		});
	}

	onLoadFromJson() {
		this.contactForm.fromObject({
			email: 'test@example.com',
			full_name: 'test user',
			message: 'a sample message',
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

		await new Promise((r) => setTimeout(r, 2000));

		this.contactForm.submit();

		this.notifier.notify({
			title: 'Form submitted',
			type: 'success',
		});

		this.loading = false;
	}
}

export default ContactViewModel;
