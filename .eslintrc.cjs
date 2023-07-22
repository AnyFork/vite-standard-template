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
        '@typescript-eslint/triple-slash-reference': 'off',
        // 关闭Eslint 缩进校验规则
        indent: 'off',
        // 关闭@typescript-eslint/indent缩进报错
        '@typescript-eslint/indent': 'off',
        // 关闭方法之前的空格校验
        'space-before-function-paren': 'off',
        // 关闭ts声明的方法之前的空格校验
        '@typescript-eslint/space-before-function-paren': 'off',
        // 关闭ts类型单行和多行结尾分隔符
        '@typescript-eslint/member-delimiter-style': 'off',
        // 关闭组件以单个单次命名限制
        'vue/multi-word-component-names': 'off',
        // 关闭强制布尔表达式
        '@typescript-eslint/strict-boolean-expressions': 'off'
    }
}
