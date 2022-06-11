import { createProxyModel, ProxyModel } from './ProxyModel';
import { createValidationProxy, ValidationProxyType } from './ValidationProxy';

export type ValidationProxyModel<T> = ValidationProxyType<T> & ProxyModel<T>;

export const createValidationProxyModel = <T extends object>(
	model: T
): ValidationProxyModel<T> => {
	return createValidationProxy(createProxyModel(model));
};
