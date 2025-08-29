module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  plugins: [
    'react',
    'react-hooks',
    '@typescript-eslint',
    'import',
    'prettier',
  ],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier',
    'plugin:prettier/recommended',
  ],
  env: {
    browser: true,
    node: true,
  },
  settings: {
    react: { version: 'detect' },
  },
  rules: {
    // 开启prettier自动修复功能
    'prettier/prettier': 'error',
    'react/react-in-jsx-scope': 'off', // 不需要手动 import React
  },
  ignorePatterns: ['dist', 'node_modules'],
}
