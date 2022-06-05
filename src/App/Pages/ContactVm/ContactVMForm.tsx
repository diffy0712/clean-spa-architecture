import { Expose } from "class-transformer";
import { IsEmail, MinLength, validate, ValidationError } from "class-validator";
import { computed, makeObservable, observable } from "mobx";
import BaseSerializableModel from "../../../System/Models/BaseSerializableModel";

class ContactVMForm extends BaseSerializableModel {
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
  errors: ValidationError[] = [];

  @computed
  get isValid(): boolean {
    return this.errors.length === 0;
  }

  constructor() {
    super();
    this.validate();
    makeObservable(this);
  }

  async validate() {
    this.errors = await validate(this);
  }
}

export default ContactVMForm;
