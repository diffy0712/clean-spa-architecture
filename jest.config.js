const { pathsToModuleNameMapper } = require('ts-jest');
// In the following statement, replace `./tsconfig` with the path to your `tsconfig` file
// which contains the path mapping (ie the `compilerOptions.paths` option):
const { compilerOptions } = require('./tsconfig');

const config = {
	maxWorkers: 5,
	testMatch: [
		'<rootDir>/src/App/**/*.test.(ts|tsx)',
		'<rootDir>/src/System/**/*.test.(ts|tsx)',
	],
	setupFilesAfterEnv: ['<rootDir>/src/Tests/setupTests.ts'],
	collectCoverageFrom: [
		'**/*.{ts,tsx}',
		'!<rootDir>/node_modules',
		'!<rootDir>/src/*.{ts,tsx}',
		'!<rootDir>/src/App/*.{ts,tsx}',
		'!<rootDir>/src/System/*.{ts,tsx}',
		'!<rootDir>/src/Tests/**/*',
		'!<rootDir>/src/stories/**/*.stories.mdx',
		'!<rootDir>/src/stories/**/*.stories.@(js|jsx|ts|tsx)',
	],
	coverageReporters: ['lcov', 'cobertura'],
	reporters: ['default'],
	moduleNameMapper: {
		'\\.(css|less|scss|sass)$': 'identity-obj-proxy',
		...pathsToModuleNameMapper(compilerOptions.paths, {
			prefix: '<rootDir>/',
		}),
	},
	transform: {
		'^.+\\.(ts|tsx)$': 'ts-jest',
	},
	transformIgnorePatterns: ['<rootDir>/node_modules/'],
	testEnvironment: 'jest-environment-jsdom',
	unmockedModulePathPatterns: ['node_modules/react/'],
};

module.exports = config;
