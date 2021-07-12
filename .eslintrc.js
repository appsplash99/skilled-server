module.exports = {
  env: {
    es2021: true,
    node: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb-base',
    'plugin:prettier/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier', 'import'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'consistent-return': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'error',
    'no-console': 'off',
    'import/prefer-default-export': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    'import/newline-after-import': ['error', { count: 1 }],
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'no-use-before-define': ['error', { variables: false, functions: false }],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'import/order': [
      'error',
      {
        'newlines-between': 'never',
        groups: [
          ['builtin', 'external'],
          ['internal', 'parent', 'sibling', 'index'],
        ],
      },
    ],
  },
};
