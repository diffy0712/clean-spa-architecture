import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import PopConfirm from '@System/Components/PopConfirm/PopConfirm';
import { Button } from '@mui/material';

export default {
	title: 'System - PopConfirm',
	component: PopConfirm,
	parameters: {
		// More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
		layout: 'fullscreen',
	},
} as ComponentMeta<typeof PopConfirm>;

const Template: ComponentStory<typeof PopConfirm> = (args) => (
	<PopConfirm {...args}>
		<Button>Delete</Button>
	</PopConfirm>
);

export const Default = Template.bind({});
Default.args = {};

export const Modal = Template.bind({});
Modal.args = {
	modal: true,
	popover: false,
};
