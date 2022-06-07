import { Expose } from "class-transformer";
import { IsEmail, IsIn, MinLength } from "class-validator";
import {makeObservable, observable } from "mobx";
import BaseSerializableModel from "../../../System/Models/BaseSerializableModel";

class ContactForm extends BaseSerializableModel {
  @observable
  @Expose()
  @IsEmail({ message: "Not a valid email" })
  email: string = "";

  @observable
  @Expose({ name: "full_name" })
  @MinLength(1)
  fullName: string = "";

  @observable
  @Expose()
  message: string = "";

  @observable
  @Expose()
  @IsIn([true], { message: 'You must accept terms and contidions!' })
  termsAndConditionsAccepted: boolean = false;

  constructor() {
    super();
    makeObservable(this);
  }
}

export default ContactForm;
