module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'prettier',
    'prettier/prettier',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['react', 'react-native', 'prettier', 'react-hooks', 'jsx-a11y', 'simple-import-sort', '@typescript-eslint'],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    eqeqeq: 'warn',
    'no-cond-assign': ['error', 'always'],

    'react/jsx-uses-react': 'off',
    'react/prop-types': 'off',
    'react/jsx-uses-vars': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'react/react-in-jsx-scope': 'off',
    'react/hook-use-state': 'error',
    'react/destructuring-assignment': 'off',
    'react/jsx-boolean-value': 'error',
    'react/jsx-curly-brace-presence': 'error',
    'react/jsx-no-constructed-context-values': 'error',
    'react/jsx-no-duplicate-props': 'error',
    'react/jsx-no-target-blank': 'error',
    'react/jsx-no-useless-fragment': 'error',
    'react/display-name': 'off',
    'react/jsx-sort-props': [
      'error',
      {
        shorthandFirst: true,
        multiline: 'last',
        callbacksLast: true,
        noSortAlphabetically: true,
        reservedFirst: true,
      },
    ],
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'react/jsx-pascal-case': [
      'error',
      {
        allowAllCaps: false,
        allowLeadingUnderscore: false,
        allowNamespace: false,
      },
    ],
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'jsx-a11y/anchor-is-valid': 'error',
    'simple-import-sort/imports': [
      'error',
      { groups: [['^react(.*)$'], ['^(?!@|^./|^../).*'], ['@(.*)'], ['^[../]'], ['^[./]']] },
    ],
  },
};
