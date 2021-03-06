import { action, computed, makeObservable, observable } from 'mobx';
import { MouseEvent } from 'react';
import { PopConfirmVariants } from '@System/Components/PopConfirm/Variants/PopConfirmVariantFactory';

export class PopConfirmViewModelProps {
	modal?: boolean = false;
	popover?: boolean = true;
	onClick?: (event: MouseEvent<HTMLSpanElement>) => void;
}

class PopConfirmViewModel {
	protected props?: PopConfirmViewModelProps;

	@observable
	protected _visible = false;

	@computed
	get visible() {
		return this._visible;
	}

	@observable
	protected _variant?: PopConfirmVariants;

	@computed
	get variant() {
		return this._variant;
	}

	protected setVariant() {
		if (this.props?.modal) {
			this._variant = 'modal';
			return;
		}

		if (this.props?.popover) {
			this._variant = 'popover';
			return;
		}

		throw new Error('PopConfirm variant not found!');
	}

	constructor(props?: PopConfirmViewModelProps) {
		this.props = props;
		this.setVariant();
		makeObservable(this);
	}

	@action
	onWrapperClick(event: MouseEvent<HTMLSpanElement>) {
		this._visible = true;
		this.props?.onClick?.(event);
	}

	@action
	onCancel() {
		this._visible = false;
	}
}

export default PopConfirmViewModel;
