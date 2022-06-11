import {
	FormControl,
	FormHelperText,
	InputLabel,
	InputProps as MUIInputProps,
	Input as MUIInput,
} from '@mui/material';
import { ChangeEvent, Fragment, useState } from 'react';
import ControlledValidationModelProps from '../../Props/ControlledValidationModelProps';

type InputProps<T> = {
	label?: string;
} & ControlledValidationModelProps<T, React.ChangeEvent<HTMLInputElement>> &
	Omit<MUIInputProps, 'onChange' | 'value'>;

const Input = <T extends string | number | readonly string[]>({
	label,
	errors: propErrors,
	onChange,
	onBlur,
	...props
}: InputProps<T>) => {
	const [isTouched, setIsTouched] = useState<boolean>(false);
	const errors = isTouched ? propErrors : [];

	const onTouchedBlur = (
		event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setIsTouched(true);
		onBlur?.(event);
	};

	return (
		<FormControl
			error={errors && errors.length > 0}
			variant="standard"
			className="w-full"
		>
			{label && <InputLabel htmlFor={props.id}>{label}</InputLabel>}
			<MUIInput
				type="text"
				onChange={(event: ChangeEvent<HTMLInputElement>) => {
					onChange?.(event);
				}}
				minRows={2}
				maxRows={10}
				aria-describedby="component-error-text"
				onBlur={onTouchedBlur}
				{...props}
			/>
			{errors && errors.length > 0 && (
				<FormHelperText id="component-error-text">
					{errors?.map((error) => (
						<Fragment key={error}>{error}</Fragment>
					))}
				</FormHelperText>
			)}
		</FormControl>
	);
};

Input.defaultProps = {
	errors: [],
};

export default Input;
