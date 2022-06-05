import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import React, { ReactElement } from "react";
import DataTransformerInterface from "../../DataTransformers/DataTransformerInterface";

function setProperty<T>(model: T, property: keyof T, value: any) {
  runInAction(() => {
    model[property] = value;
  });
}

const executeTransformersToIn = (
  newValue: any,
  transformers: DataTransformerInterface<unknown, unknown>[]
): any => {
  let transformedValue = newValue;

  transformers.forEach((transformer) => {
    transformedValue = transformer.transformToIn(newValue);
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
    transformedValue = transformer.transformToOut(newValue, oldValue);
  });

  return transformedValue;
};

export type BindModelProps<T> = {
  model: T;
  property: keyof T;
  children: ReactElement;
  extraProps?: Record<string, any>;
  dataTransformers?: DataTransformerInterface<unknown, unknown>[];
  afterChange?: (value: any, prevValue: any) => void;
};

const BindModel = <T extends unknown>({
  model,
  property,
  extraProps,
  afterChange,
  dataTransformers,
  children
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

    if (typeof eventOrValue.target !== "undefined") {
      value = eventOrValue.target.value as T;
    } else {
      value = eventOrValue;
    }

    value = executeTransformersToOut(value, prevValue, dataTransformers!);

    if (value !== undefined) {
      setProperty(model, property, value);
    }

    afterChange?.(model[property], prevValue);
  };

  return React.cloneElement(children, extraProps);
};

BindModel.defaultProps = {
  dataTransformers: []
};

export default observer(BindModel);
