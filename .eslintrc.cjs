module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	globals: {
		defineOptions: true,
	},
	extends: [
		"eslint-config-prettier",
		"plugin:import/recommended",
		"eslint:recommended",
		"plugin:vue/vue3-recommended",
		"plugin:prettier/recommended",
	],
	overrides: [],
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
	},
	plugins: ["vue"],
	rules: {
		"import/prefer-default-export": "off",
		"import/no-extraneous-dependencies": "off",
		"import/no-duplicates": "off",
		"import/no-unresolved": "off",
		"import/named": "off",
		"import/order": "off",
		"import/first": "off",
		"vue/attributes-order": "off",
		"vue/no-mutating-props": "off",
		"vue/no-reserved-component-names": "off",
		"vue/no-v-html": "off",
		"vue/multi-word-component-names": "off",
		"no-param-reassign": "off",
		"no-console": "off",
		"no-restricted-globals": "off",
		"no-debugger": "off",
		"no-use-before-define": "off",
		"no-promise-executor-return": "off",
		"spaced-comment": "off",
		"block-spacing": ["error", "never"],
		"no-unused-vars": "error",
		"vue/no-unused-vars": "error",
	},
	settings: {
		"import/resolver": {
			alias: {
				map: [
					["@", "./src"],
					["@frontend", "./src/app-frontend"],
				],
			},
		},
	},
}
