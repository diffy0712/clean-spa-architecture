const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const path = require('path');

const pathsPlugin = new TsconfigPathsPlugin({
	configFile: path.resolve(__dirname, '../tsconfig.json'),
});

module.exports = {
	stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
		'@storybook/preset-create-react-app',
	],
	framework: '@storybook/react',
	core: {
		builder: '@storybook/builder-webpack5',
	},
	webpackFinal: async (config) => {
		config.resolve.plugins = [
			...(config.resolve.plugins || []),
			new TsconfigPathsPlugin(),
		];

		return config;
	},
};
