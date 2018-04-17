module.exports = {
  extends: ["react-app"],
  rules: {
    "no-unused-vars": [
      "warn",
      {
        varsIgnorePattern: "^debug$",
      },
    ],
  },
}
