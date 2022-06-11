import { observer } from 'mobx-react-lite';
import { ValidationProxyType } from '../../Models/ValidationProxy';
import BindModel, { BindModelProps } from './BindModel';

export type BindValidationModelProps<T> = BindModelProps<T>;

const BindValidationModel = <T extends ValidationProxyType<unknown>>({...props}: BindValidationModelProps<T>) => {
	const extraProps: {
		errors: string[];
	} = {
		errors: props.model.getPropertyErrors(props.property.toString()),
	};
	return <BindModel extraProps={extraProps} {...props} />;
};

export default observer(BindValidationModel);
