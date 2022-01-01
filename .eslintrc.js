/*
 * @Author: GZH
 * @Date: 2021-12-29 11:26:16
 * @LastEditors: GZH
 * @LastEditTime: 2022-01-01 19:57:14
 * @FilePath: \vue3-admin-ts\.eslintrc.js
 * @Description:
 */
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/vue3-essential', '@vue/standard', '@vue/typescript/recommended'],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'space-before-function-paren': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'no-unused-expressions': 'off', // 箭头函数可用
    '@typescript-eslint/ban-types': 'off' // 可以使用 object
  }
}

// '@typescript-eslint/explicit-module-boundary-types': 'off'
