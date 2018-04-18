module.exports = {
  extends: ["react-app", "eslint:recommended", "plugin:react/recommended"],
  rules: {
    "no-unused-vars": [
      "warn",
      {
        varsIgnorePattern: "^debug$",
      },
    ],
    "no-console": [
      "warn",
      {
        allow: ["warn", "error"],
      },
    ],
  },
}
