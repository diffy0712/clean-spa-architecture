import {
	FormHelperText,
	CheckboxProps as MUICheckboxProps,
	Checkbox as MUICheckbox,
	FormGroup,
	FormControlLabel,
} from '@mui/material';
import { ChangeEvent, Fragment, useState } from 'react';
import ControlledValidationModelProps from '../../Props/ControlledValidationModelProps';

type CheckboxProps = {
	label?: string;
	touchErrors?: boolean;
} & ControlledValidationModelProps<
	boolean,
	React.ChangeEvent<HTMLInputElement>
> &
	Omit<MUICheckboxProps, 'onChange' | 'value'>;

const Checkbox = ({
	label,
	errors: propErrors,
	touchErrors,
	onChange,
	value,
	...props
}: CheckboxProps) => {
	const [isTouched, setIsTouched] = useState<boolean>(false);
	const errors = isTouched || !touchErrors ? propErrors : [];

	const checkbox = (
		<>
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
		</>
	);

	return (
		<FormGroup className="w-full">
			{label && (
				<FormControlLabel
					control={checkbox}
					label={label}
					labelPlacement="end"
					htmlFor={props.id}
					data-testid="checkbox-label"
				/>
			)}

			{!label && checkbox}

			{errors && errors.length > 0 && (
				<FormHelperText id="component-error-text" data-testid="checkbox-errors">
					{errors?.map((error) => (
						<span key={error}>{error}</span>
					))}
				</FormHelperText>
			)}
		</FormGroup>
	);
};

Checkbox.defaultProps = {
	errors: [],
	touchErrors: false,
};

export default Checkbox;
