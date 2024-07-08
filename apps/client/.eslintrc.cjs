const config = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "prettier",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "plugin:react-hooks/recommended",
    "plugin:storybook/recommended",
  ],
  ignorePatterns: [
    "tailwind.config.js",
    "postcss.config.js",
    "cypress/support/commands.js",
  ],
  rules: {
    "@typescript-eslint/array-type": "off",
    "@typescript-eslint/consistent-type-definitions": "off",
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      {
        prefer: "type-imports",
        fixStyle: "inline-type-imports",
      },
    ],
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/no-misused-promises": [
      2,
      {
        checksVoidReturn: { attributes: false },
      },
    ],

    "import/prefer-default-export": "off", // Allows named exports without default export
    "no-console": "warn", // Warns about the use of console.log and similar functions
    "no-param-reassign": "warn", // Warns against reassigning function parameters
    "no-unused-vars": "warn", // Warns about unused variables (outside of TypeScript files)
    "prefer-destructuring": "warn", // Encourages destructuring when possible
    "no-underscore-dangle": "off", // Allows underscores in variable names
  },
};

module.exports = config;
