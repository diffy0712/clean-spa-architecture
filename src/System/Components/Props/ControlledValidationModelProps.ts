import { SyntheticEvent } from 'react';
import ControlledModelProps from './ControlledModelProps';

type ControlledValidationModelProps<
	T,
	EVENT extends SyntheticEvent = SyntheticEvent
> = {
	errors?: string[];
} & ControlledModelProps<T, EVENT>;

export default ControlledValidationModelProps;
