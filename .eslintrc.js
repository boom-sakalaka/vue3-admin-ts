/*
 * @Author: GZH
 * @Date: 2021-12-29 11:26:16
 * @LastEditors: GZH
 * @LastEditTime: 2021-12-29 13:43:26
 * @FilePath: \qrcode-proj\.eslintrc.js
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
    'space-before-function-paren': 'off'
  }
}
