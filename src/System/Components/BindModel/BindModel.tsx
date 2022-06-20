import { runInAction } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { ReactElement } from 'react';
import DataTransformerInterface from '@System/DataTransformers/DataTransformerInterface';
import ControlledModelProps from '@System/Components/Props/ControlledModelProps';

function setProperty<T>(model: T, propertyOrSetter: keyof T, value: any) {
	runInAction(() => {
		if (typeof model[propertyOrSetter] === 'function') {
			(model[propertyOrSetter] as unknown as (value: keyof T) => void)(value);
		} else {
			model[propertyOrSetter] = value;
		}
	});
}

const executeTransformersToIn = (
	newValue: any,
	transformers: DataTransformerInterface<unknown, unknown>[]
): any => {
	let transformedValue = newValue;

	transformers.forEach((transformer) => {
		transformedValue = transformer.transformToIn(transformedValue);
	});

	return transformedValue;
};

const executeTransformersToOut = (
	newValue: any,
	oldValue: any,
	transformers: DataTransformerInterface<unknown, unknown>[]
): any => {
	let transformedValue = newValue;

	transformers.forEach((transformer) => {
		transformedValue = transformer.transformToOut(transformedValue, oldValue);
	});

	return transformedValue;
};

export type BindModelProps<T> = {
	model: T;
	property: keyof T;
	children: ReactElement<ControlledModelProps<unknown>>;
	extraProps?: Record<string, any>;
	dataTransformers?: DataTransformerInterface<unknown, unknown>[];
	afterChange?: (value: any, prevValue: any) => void;
	setter?: keyof T;
};

const BindModel = <T extends object>({
	model,
	property,
	extraProps,
	afterChange,
	dataTransformers,
	children,
	setter,
}: BindModelProps<T>) => {
	if (!extraProps) {
		extraProps = {};
	}

	extraProps.value = executeTransformersToIn(
		model?.[property],
		dataTransformers!
	);

	extraProps.onChange = (
		eventOrValue: React.ChangeEvent<HTMLInputElement> | any
	) => {
		const prevValue = model[property];
		let value: any;

		if (typeof eventOrValue.target !== 'undefined') {
			if (eventOrValue.target.type === 'checkbox') {
				value = eventOrValue.target.checked as boolean;
			} else {
				value = eventOrValue.target.value as T;
			}
		} else {
			value = eventOrValue;
		}

		value = executeTransformersToOut(value, prevValue, dataTransformers!);

		setProperty(model, setter ?? property, value);
		afterChange?.(model[property], prevValue);
	};

	return React.cloneElement(children, extraProps);
};

BindModel.defaultProps = {
	dataTransformers: [],
};

export default observer(BindModel);
