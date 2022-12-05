const env = process.env.NODE_ENV;

module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'prettier',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
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

    // unused-imoprts
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

    // Typescript
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-empty-interface': [
      'error',
      {
        allowSingleExtends: true,
      },
    ],
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
  },
  parser: '@typescript-eslint/parser',
  plugins: ['unused-imports', '@typescript-eslint'],
};
