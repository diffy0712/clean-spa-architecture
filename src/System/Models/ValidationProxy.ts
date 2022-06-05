import { observable } from 'mobx';
import { validateSync, getMetadataStorage, ValidationError } from 'class-validator';

export type ValidationProxyType<T> = {
    errors: ValidationProxyErrors;
    isValid: (groups?: string[]) => boolean;
    getPropertyErrors: (property: string, groups?: string[]) => string[];
    hasPropertyError: (property: string, groups?: string[]) => boolean;
    validate: () => Promise<void>;
} & T;

export type ValidationProxyErrors = Record<string | 'all', ValidationError[]>;

export const createValidationProxy = <T extends object>(model: T, groups: string[] = []): ValidationProxyType<T> => {
  let errors: ValidationProxyErrors = observable({});

  const validateModel = (validateModel: T) => {
    errors.all = validateSync(validateModel, { groups: undefined });
    groups.forEach(group => {
      errors[group] = validateSync(validateModel, { groups: [group] });
    });
  };

  const getPropertyErrors = (
    propertyName: string,
    validationGroup = 'all',
  ): string[] => {
    const propertyError = errors[validationGroup].find(
      (error: ValidationError) => error.property === propertyName,
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
  };

  const hasPropertyError = (
    propertyName: string,
    validationGroup = 'all'): boolean => {
    return !!errors[validationGroup].find(
      (error: ValidationError) => error.property === propertyName,
    );
  }

  const isValid = (groups: string[] = ['all']): boolean => {
    // TODO: implement
    return true
  }

  const propertyShouldTriggerValidation = (property: string): boolean => {
    // FIXME: the validationMetadatas is a private method, but I really needed it. so find an alternative solution
    const GetMetadataStorage: any = getMetadataStorage;
    const modelValidations = GetMetadataStorage().validationMetadatas.filter(
      (data: any) => data.target === model.constructor,
    );
    const modelValidationGroupsByPropertyName = Object.keys(
      modelValidations,
    ).reduce((carry: any, key: any) => {
      const modelPropertyValidationGroups = modelValidations[key].groups;
      carry[modelValidations[key].propertyName] = modelPropertyValidationGroups;
      return carry;
    }, {});

    return Object.keys(modelValidationGroupsByPropertyName).includes(property);
  }

  const validationProxyModel: ValidationProxyType<T> = new Proxy(model, {
    get(obj: any, prop: string) {
      switch (prop) {
        case 'getPropertyErrors': 
          return getPropertyErrors;
        case 'hasPropertyError': 
          return hasPropertyError;
        case 'isValid': 
          return isValid;
        case 'validate': 
          return validateModel;
        case 'errors': 
          return errors;
        default:
          return obj[prop]
      }
    },
    set(obj: any, prop: string, value: any) {
      obj[prop] = value;
      if (propertyShouldTriggerValidation(prop)) {
        validateModel(obj);
      }
      return true;
    },
  }) as ValidationProxyType<T>;

  // decorators for class-validator and class-transformer
  // are registered for the model's constructor, so in order
  // for them to work as expected, need to override the constructor
  validationProxyModel.constructor = model.constructor;

  validateModel(validationProxyModel);

  return validationProxyModel;
};