import { action, computed, makeObservable, observable } from 'mobx';
import { MouseEvent } from 'react';

type PopConfirmVariants = 'modal' | 'popover';

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

	@computed
	get variant(): PopConfirmVariants {
		if (this.props?.modal) {
			return 'modal';
		}

		if (this.props?.popover) {
			return 'popover';
		}

		throw new Error('PopConfirm variant not found!');
	}

	constructor(props?: PopConfirmViewModelProps) {
		this.props = props;
		makeObservable(this);
	}

	@action
	onWrapperClick(event: MouseEvent<HTMLSpanElement>) {
		this._visible = true;
		this.props?.onClick?.(event);
	}
}

export default PopConfirmViewModel;
