import { makeObservable, observable } from "mobx";
import { createValidationProxyModel, ValidationProxyModel } from "../../../System/Models/ValidationProxyModel";
import ContactVMForm from "./ContactVMForm";

export class ContactViewModelProps {
  onChange?: (value: ContactVMForm) => void = undefined;
}

class ContactViewModel {
  public contactForm: ValidationProxyModel<ContactVMForm>;

  @observable
  public loading: boolean = false;

  get isSubmittable(): boolean {
    return this.contactForm.isValid() && this.contactForm.isDirty;
  }

  constructor(props?: ContactViewModelProps) {
    console.log("ContactViewModel Initialized", props);
    this.contactForm = createValidationProxyModel(new ContactVMForm());

    makeObservable(this);
  }

  update(props: ContactViewModelProps) {
    console.log("update", props);
  }

  dispose() {
    console.log("dispose");
  }

  onLoadFromJson() {
    this.contactForm.fromObject({
      email: "test@example.com",
      full_name: "test user",
      message: "a sample message"
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
      throw Error("Should not be able to call on not submitable form.");
    }

    this.loading = true;

    // simulate some api call
    await new Promise((r) => setTimeout(r, 2000));

    this.contactForm.submit();

    this.loading = false;
  };
}

export default ContactViewModel;
