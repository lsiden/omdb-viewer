module.exports = {
	"env": {
		"browser": true,
		"es6": true,
		"jest/globals": true
	},
	"extends": ["eslint:recommended", "plugin:react/recommended"],
	"parser": "babel-eslint",
	"parserOptions": {
		"ecmaFeatures": {
			"experimentalObjectRestSpread": true,
			"jsx": true,
			"classes": true,
		},
		"sourceType": "module"
	},
	"plugins": [
		"react",
		"jest"
	],
	"rules": {
		"no-unused-vars": ["warn", {
			"varsIgnorePattern": "^debug$|^_"
		}],
		"indent": ["warn", "tab" ],
		"linebreak-style": ["error", "unix"],
		"quotes": ["warn", "single"],
		"semi": ["warn", "never"],
		"no-console": ["warn", {
			"allow": ["assert", "warn", "error"]
		}]
	},
	"overrides": {
		"files": ["**/*.spec.js"],
		"globals": {
			"describe": true,
			"it": true,
			"beforeEach": true,
			"expect": true,
		}
	},
	"globals": {
		"require": true,
	},
};
