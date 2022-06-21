import { fireEvent, render } from '@testing-library/react';
import { makeObservable, observable } from 'mobx';
import withViewModel, { WithViewModelProps } from './withViewModel';

describe('withViewModel Higher Order Component (HOC) test', () => {
	test('Test if component can render', () => {
		const { getByTestId } = render(
			<WithViewModelTestComponent value="test" data-testid="test-container" />
		);
		expect(getByTestId('test-container')).toBeVisible();
	});

	test('Test if Fancy component can render with value', async () => {
		const { getByTestId, queryByText } = render(
			<WithViewModelTestComponent
				fancy
				value="testValue"
				data-testid="test-container"
			/>
		);
		expect(getByTestId('fancy-box')).toContainHTML('Fancy');
		expect(queryByText('Not Fancy')).toBeNull();
		expect(getByTestId('value-box')).toContainHTML('testValue');
	});

	test('Test if Not Fancy component can render with value', async () => {
		const { getByTestId, queryByText } = render(
			<WithViewModelTestComponent
				fancy={false}
				value="testValue"
				data-testid="test-container"
			/>
		);
		expect(getByTestId('fancy-box')).toContainHTML('Not Fancy');
		expect(queryByText('Fancy')).toBeNull();
		expect(getByTestId('value-box')).toContainHTML('testValue');
	});

	test('Test if onChange action is called', async () => {
		const onChangeMock = jest.fn();
		const { getByTestId } = render(
			<WithViewModelTestComponent value="testValue" onChange={onChangeMock} />
		);

		const button = getByTestId('test-button');
		fireEvent.click(button);

		expect(onChangeMock).toBeCalledTimes(1);
		expect(onChangeMock).toBeCalledWith('onSubmitForm');
	});

	test.todo('Test if observable works');
});

export class TestViewModelProps {
	onChange?: (value: string) => void = undefined;
	value: string | null = null;
}

export class TestViewModel {
	protected props?: TestViewModelProps;

	@observable
	value: string | null = null;

	constructor(props: TestViewModelProps | undefined) {
		this.props = props;
		this.value = (props as TestViewModelProps).value;
		makeObservable(this);
	}

	async onSubmitForm() {
		this.props?.onChange?.('onSubmitForm');
	}
}

type TestViewModelComponentProps = {
	fancy?: boolean;
} & React.DetailedHTMLProps<
	React.HTMLAttributes<HTMLDivElement>,
	HTMLDivElement
>;

const TestViewModelComponent = ({
	fancy,
	viewModel,
	...props
}: WithViewModelProps<TestViewModel> & TestViewModelComponentProps) => (
	<div {...props}>
		<span data-testid="fancy-box">{fancy ? 'Fancy' : 'Not Fancy'}</span>
		<span data-testid="value-box">{viewModel.value}</span>
		<button
			data-testid="test-button"
			onClick={viewModel.onSubmitForm.bind(viewModel)}
		>
			testButton
		</button>
	</div>
);

TestViewModelComponent.defaultProps = {
	fancy: false,
};

export const WithViewModelTestComponent = withViewModel<
	TestViewModelComponentProps,
	TestViewModel,
	TestViewModelProps
>(TestViewModelComponent, TestViewModel, TestViewModelProps);
