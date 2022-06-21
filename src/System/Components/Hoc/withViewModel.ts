import React, { FC, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import useInstance from '@System/Components/Hooks/useInstance';

export interface WithViewModelProps<T> {
	viewModel: T;
}

const withViewModel = <
	COMPONENT_PROPS,
	VIEW_MODEL_CLASS,
	VIEW_MODEL_PROPS = unknown
>(
	BaseComponent: FC<WithViewModelProps<VIEW_MODEL_CLASS> & COMPONENT_PROPS>,
	ViewModelConstructor: new (
		props: VIEW_MODEL_PROPS | undefined
	) => VIEW_MODEL_CLASS,
	propsClass?: (new () => VIEW_MODEL_PROPS) | undefined
): FC<COMPONENT_PROPS & VIEW_MODEL_PROPS> => {
	const component = (props: COMPONENT_PROPS & VIEW_MODEL_PROPS) => {
		let viewModelProps: VIEW_MODEL_PROPS | undefined = undefined;
		let componentProps: any = {};
		if (propsClass) {
			const propsClassRef = useRef<VIEW_MODEL_PROPS>(new propsClass());
			viewModelProps = propsClassRef.current;
			componentProps = {};
			const viewModelPropsKeys = Object.keys(propsClassRef.current);
			Object.keys(props).forEach((prop) => {
				if (viewModelPropsKeys.includes(prop)) {
					// @ts-ignore
					viewModelProps[prop] = (props as any)[prop];
				} else {
					// @ts-ignore
					componentProps[prop] = (props as any)[prop];
				}
			});
		}
		const viewModel = useInstance<VIEW_MODEL_CLASS, VIEW_MODEL_PROPS>(
			ViewModelConstructor,
			viewModelProps
		);

		return React.createElement(observer(BaseComponent), {
			viewModel,
			...componentProps,
		});
	};

	component.displayName = `${BaseComponent.displayName}WithViewModel`;
	return component;
};

export default withViewModel;
