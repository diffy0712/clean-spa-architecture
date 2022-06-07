import {
  FormHelperText,
  InputLabel,
  CheckboxProps as MUICheckboxProps,
  Checkbox as MUICheckbox,
  FormGroup,
  FormControlLabel
} from "@mui/material";
import { ChangeEvent, Fragment, useState } from "react";
import ControlledValidationModelProps from "../../Props/ControlledValidationModelProps";

type CheckboxProps = {
  label?: string;
} & ControlledValidationModelProps<boolean, React.ChangeEvent<HTMLInputElement>> &
  Omit<MUICheckboxProps, "onChange" | "value">;

const Checkbox = ({
  label,
  errors: propErrors,
  onChange,
  value,
  onBlur,
  ...props
}: CheckboxProps) => {
  const [isTouched, setIsTouched] = useState<boolean>(false);
  const errors = isTouched ? propErrors : [];

  const checkbox = (<>
    <MUICheckbox
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
            if (!isTouched) {
                setIsTouched(true);
            }

            onChange?.(event);
        }}
        aria-describedby="component-error-text"
        checked={value}
        {...props}
    />
  </>);

  return (
    <FormGroup
      className="w-full"
    >
      {label && (

        <FormControlLabel
            control={checkbox}
            label={label}
            labelPlacement="end"
            htmlFor={props.id}
        />
      )}

      {!label && (checkbox)}
      
      {errors && errors.length > 0 && (
        <FormHelperText id="component-error-text">
          {errors?.map((error) => (
            <Fragment key={error}>{error}</Fragment>
          ))}
        </FormHelperText>
      )}
    </FormGroup>
  );
};

Checkbox.defaultProps = {
  errors: []
};

export default Checkbox;
