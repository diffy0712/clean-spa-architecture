import { observer } from "mobx-react-lite";
import { ValidationProxyType } from "../../Models/ValidationProxy";
import BindModel, { BindModelProps } from "./BindModel";

export type BindValidationModelProps<T> = {
  hideError?: boolean;
} & BindModelProps<T>;

const BindValidationModel = <T extends ValidationProxyType<unknown>>({
  hideError,
  children,
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
      children={children}
      {...props}
    />
  );
};

export default observer(BindValidationModel);
