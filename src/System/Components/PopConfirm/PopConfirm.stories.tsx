import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import PopConfirm from '@System/Components/PopConfirm/PopConfirm';

export default {
	title: 'System - PopConfirm',
	component: PopConfirm,
	parameters: {
		// More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
		layout: 'fullscreen',
	},
} as ComponentMeta<typeof PopConfirm>;

const Template: ComponentStory<typeof PopConfirm> = (args) => (
	<PopConfirm {...args} />
);

export const Default = Template.bind({});
Default.args = {
	modal: true,
};
