import { Expose } from "class-transformer";
import { IsEmail, MinLength, validate, ValidationError } from "class-validator";
import { computed, makeObservable, observable } from "mobx";
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

  getPropertyErrors(property: string): string[] {
    const propertyError: ValidationError | undefined = this.errors.find(
      (error, index) => error.property === property
    );
    if (!propertyError) {
      return [];
    }
    return Object.keys(propertyError.constraints || {}).reduce(
      (errors: string[], key) => {
        if (
          propertyError &&
          propertyError.constraints &&
          propertyError.constraints[key]
        ) {
          errors.push(propertyError.constraints[key]);
        }

        return errors;
      },
      []
    );
  }

  hasPropertyError(property: string): boolean {
    return !!this.errors.find((error) => error.property === property);
  }
}

export default ContactForm;
