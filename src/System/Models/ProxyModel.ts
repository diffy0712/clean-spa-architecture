import { createViewModel, IViewModel } from 'mobx-utils';

/**
 * fix for mobx-utils IViewModel interface
 * The library's exported interface is not correct,
 * it should extend the T generics as well.
 */
export type ProxyModel<T> = IViewModel<T> & T;

/**
 * Use ProxyModel name instead of ViewModel
 * since ViewModel has a different meaning for me.
 */
export const createProxyModel = <T extends object>(
	modelInstance: T
): ProxyModel<T> => {
	const proxyModel: ProxyModel<T> = createViewModel(modelInstance);

	// decorators for class-validator and class-transformer
	// are registered for the model's constructor, so in order
	// for them to work as expected, need to override the constructor
	proxyModel.constructor = modelInstance.constructor;

	return proxyModel;
};
