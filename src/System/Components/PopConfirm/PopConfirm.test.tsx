import { render } from '@testing-library/react';
import PopConfirm from '@System/Components/PopConfirm/PopConfirm';
import userEvent from '@testing-library/user-event';

describe('PopConfirm tests', () => {
	test('Can render with default values (popover as type)', async () => {
		const { queryByTestId, getByTestId } = render(
			<PopConfirm>test</PopConfirm>
		);
		await userEvent.click(getByTestId('popconfirm-wrapper'));

		expect(queryByTestId('popconfirm-wrapper')).not.toBeNull();
		expect(queryByTestId('popconfirm-popover-wrapper')).not.toBeNull();
	});

	test('Can render with popover', async () => {
		const { queryByTestId, getByTestId } = render(
			<PopConfirm popover>test</PopConfirm>
		);
		await userEvent.click(getByTestId('popconfirm-wrapper'));

		expect(queryByTestId('popconfirm-modal-wrapper')).toBeNull();
		expect(queryByTestId('popconfirm-popover-wrapper')).not.toBeNull();
	});

	test('Can render with modal', async () => {
		const { queryByTestId, getByTestId } = render(
			<PopConfirm modal>test</PopConfirm>
		);
		await userEvent.click(getByTestId('popconfirm-wrapper'));

		expect(queryByTestId('popconfirm-popover-wrapper')).toBeNull();
		expect(queryByTestId('popconfirm-modal-wrapper')).not.toBeNull();
	});

	test('Throws Error on unknown variant', async () => {
		expect(() =>
			render(
				<PopConfirm modal={false} popover={false}>
					test
				</PopConfirm>
			)
		).toThrowError();
	});

	test('Can call onClick method', async () => {
		const onClickMock = jest.fn(() => true);
		const { getByTestId } = render(
			<PopConfirm onClick={onClickMock}>test</PopConfirm>
		);

		await userEvent.click(getByTestId('popconfirm-wrapper'));
		expect(onClickMock).toHaveBeenCalledTimes(1);
	});

	test('Can display children', async () => {
		const onClickMock = jest.fn(() => true);
		const { getByTestId } = render(
			<PopConfirm onClick={onClickMock}>
				<div data-testid="popconfirm-test">test</div>
			</PopConfirm>
		);

		expect(getByTestId('popconfirm-test')).not.toBeNull();
	});

	test.todo('');
});
