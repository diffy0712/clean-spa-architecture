import { Expose } from "class-transformer";
import { IsEmail, MinLength } from "class-validator";
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

  constructor() {
    super();
    makeObservable(this);
  }
}

export default ContactForm;
