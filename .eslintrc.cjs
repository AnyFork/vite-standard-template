module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['standard-with-typescript', 'plugin:vue/vue3-essential'],
  overrides: [
    {
      env: {
        node: true
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    project: ['./tsconfig.json'],
    ecmaVersion: 'latest',
    extraFileExtensions: ['.vue'],
    sourceType: 'module'
  },
  plugins: ['vue'],
  rules: {
    // 关闭下面/// <reference path="..." />, /// <reference types="..." />,  /// <reference lib="..." /> 校验
    '@typescript-eslint/triple-slash-reference': 'off'
  }
}
