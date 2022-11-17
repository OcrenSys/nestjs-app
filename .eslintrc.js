const env = process.env.NODE_ENV;

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'prettier',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'all',
        endOfLine: 'auto',
      },
    ],

    'linebreak-style': 0,
    'arrow-parens': [2, 'always'],
    'function-paren-newline': 0,
    'import/no-webpack-loader-syntax': 0,
    'import/no-named-as-default': 0,

    'no-plusplus': 0,
    'no-console': env !== 'production' ? 'warn' : 1,
    'no-use-before-define': 0,
    'no-underscore-dangle': 0,
    'no-restricted-globals': 0,

    'object-curly-newline': 0,
    'prefer-rest-params': 0,
    'eslint-disable-next-line': 0,

    '@typescript-eslint/triple-slash-reference': 0,
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',

    // UNUSED IMPORTS SETTING
    '@typescript-eslint/no-unused-vars': 'off', // OR 'no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
  },
  parser: '@typescript-eslint/parser',
  plugins: ['unused-imports', '@typescript-eslint'],
};
