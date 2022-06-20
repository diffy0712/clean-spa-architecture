import {
	FormControl,
	FormHelperText,
	InputLabel,
	InputProps as MUIInputProps,
	Input as MUIInput,
} from '@mui/material';
import { ChangeEvent, useState } from 'react';
import ControlledValidationModelProps from '@System/Components/Props/ControlledValidationModelProps';

type InputProps<T> = {
	label?: string;
	touchErrors?: boolean;
} & ControlledValidationModelProps<T, React.ChangeEvent<HTMLInputElement>> &
	Omit<MUIInputProps, 'onChange' | 'value'>;

const Input = <T extends string | number | readonly string[]>({
	label,
	touchErrors,
	errors: propErrors,
	onChange,
	onBlur,
	...props
}: InputProps<T>) => {
	const [isTouched, setIsTouched] = useState<boolean>(!touchErrors);
	const errors = isTouched ? propErrors : [];

	const dataTestId = props['data-testid'];

	const onTouchedBlur = (
		event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		console.log('bluring he');
		setIsTouched(true);
		onBlur?.(event);
	};

	return (
		<FormControl
			error={errors && errors.length > 0}
			variant="standard"
			className="w-full"
		>
			{label && (
				<InputLabel data-testid={`${dataTestId}-label`} htmlFor={props.id}>
					{label}
				</InputLabel>
			)}
			<MUIInput
				type="text"
				onChange={(event: ChangeEvent<HTMLInputElement>) => {
					onChange?.(event);
				}}
				minRows={2}
				maxRows={10}
				aria-describedby="form-control-input-errors"
				onBlur={onTouchedBlur}
				{...props}
			/>
			{errors && errors.length > 0 && (
				<FormHelperText
					id="form-control-input-errors"
					data-testid={`${dataTestId}-errors`}
				>
					{errors?.map((error) => (
						<span key={error}>{error}</span>
					))}
				</FormHelperText>
			)}
		</FormControl>
	);
};

Input.defaultProps = {
	errors: [],
	touchErrors: true,
};

export default Input;
