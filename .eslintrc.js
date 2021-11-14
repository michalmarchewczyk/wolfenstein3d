module.exports = {
	root: true,
	env: {
		browser: true,
		es2021: true,
		node: true
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended'
	],
	parser: '@typescript-eslint/parser',
	plugins: [
		'@typescript-eslint'
	],
	rules: {
		indent: [
			'warn',
			'tab'
		],
		quotes: [
			'warn',
			'single'
		],
		semi: [
			'warn',
			'always'
		],
		'@typescript-eslint/no-explicit-any': 2,
		'@typescript-eslint/no-var-requires': 0,
		'no-console': 1,
	}
};

