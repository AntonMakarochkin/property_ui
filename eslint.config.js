import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config({
	extends: [js.configs.recommended, ...tseslint.configs.recommended],
	files: ['**/*.{ts,tsx}'],
	ignores: ['dist'],
	languageOptions: {
		ecmaVersion: 2020,
		globals: globals.browser,
	},
	plugins: {
		'react-hooks': reactHooks,
		'react-refresh': reactRefresh,
		prettier,
		'simple-import-sort': simpleImportSort,
	},
	rules: {
		...reactHooks.configs.recommended.rules,
		'react-refresh/only-export-components': [
			'warn',
			{ allowConstantExport: true },
		],
		'prettier/prettier': ['error', {}, { usePrettierrc: true }],
		'simple-import-sort/imports': [
			'error',
			{
				groups: [
					['^react', '^@?\\w'],
					['^(@|Components)(/.*|$)'],
					['^\\.\\.(?!/?$)', '^\\.\\./?$'],
					['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
					['^\\u0000'],
					['^.+\\.?(css)$'],
				],
			},
		],
		'simple-import-sort/exports': ['error'],
		'react-hooks/rules-of-hooks': ['error'],
		'react-hooks/exhaustive-deps': ['warn'],
		'jsx-a11y/anchor-is-valid': [
			'error',
			{
				components: ['Link'],
				specialLink: ['hrefLeft', 'hrefRight'],
				aspects: ['invalidHref', 'preferButton'],
			},
		],
	},
});
