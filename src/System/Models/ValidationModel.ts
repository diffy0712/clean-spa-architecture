import { validate, ValidationError } from "class-validator";
import { computed, isObservableObject, makeObservable, observable } from "mobx";
import { getAllMethodsAndProperties } from "mobx-utils";

export interface ValidationModelInterface {
  errors: ValidationError[];
  isValid: boolean;
  getPropertyErrors: (property: string) => string[];
  hasPropertyError: (property: string) => boolean;
  validate: () => Promise<void>;
}

export type ValidationModelProps<T> = ValidationModelInterface & T;

export class ValidationModel<T> implements ValidationModelInterface {
  @observable
  errors: ValidationError[] = [];

  constructor(model: T) {
    makeObservable(this);

    if (!isObservableObject(model)) {
      throw new Error("ValidationModel expects an observable object");
    }

    const ownMethodsAndProperties = getAllMethodsAndProperties(model);
  }

  @computed
  get isValid(): boolean {
    return this.errors.length === 0;
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

export function createValidationModel<T>(
  model: T
): T & ValidationModelProps<T> {
  return new ValidationModel<T>(model) as any;
}
