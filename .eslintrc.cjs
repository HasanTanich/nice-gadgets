module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:react/jsx-runtime",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "react-hooks", "@typescript-eslint"],
  root: true,
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    "logical-assignment-operators": "error",
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      {
        prefer: "type-imports",
        fixStyle: "inline-type-imports",
      },
    ],
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
  },
};
