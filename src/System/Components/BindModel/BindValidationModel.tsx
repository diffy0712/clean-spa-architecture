import { observer } from "mobx-react-lite";
import BindModel, { BindModelProps } from "./BindModel";
import { ValidationModelProps } from "../../Models/ValidationModel";

export type BindValidationModelProps<T> = {
  hideError?: boolean;
} & BindModelProps<T>;

const BindValidationModel = <T extends ValidationModelProps>({
  hideError,
  children,
  afterChange,
  ...props
}: BindValidationModelProps<T>) => {
  const extraProps: {
    errors: string[];
  } = {
    errors: props.model.getPropertyErrors(props.property.toString())
  };
  return (
    <BindModel
      extraProps={extraProps}
      afterChange={(value, prevValue) => {
        afterChange?.(value, prevValue);

        props.model.validate();
      }}
      children={children}
      {...props}
    />
  );
};

export default observer(BindValidationModel);
