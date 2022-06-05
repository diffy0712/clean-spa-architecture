import { makeObservable, observable } from "mobx";
import {
  createProxyModel,
  ProxyModel
} from "../../../System/Models/ProxyModel";
import ContactVMForm from "./ContactVMForm";

export class ContactViewModelProps {
  onChange?: (value: ContactVMForm) => void = undefined;
}

class ContactViewModel {
  public contactForm: ProxyModel<ContactVMForm>;

  @observable
  public loading: boolean = false;

  constructor(props?: ContactViewModelProps) {
    console.log("ContactViewModel Initialized", props);
    this.contactForm = createProxyModel(new ContactVMForm());

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

    await new Promise((r) => setTimeout(r, 1000));

    this.contactForm.submit();

    this.loading = false;
  }
}

export default ContactViewModel;
