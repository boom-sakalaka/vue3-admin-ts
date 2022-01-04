/*
 * @Author: GZH
 * @Date: 2021-12-29 11:26:16
 * @LastEditors: GZH
 * @LastEditTime: 2022-01-04 13:55:54
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
    '@typescript-eslint/ban-types': 'off', // 可以使用 object
    '@typescript-eslint/no-non-null-assertion': 'off', // 使用感叹号 ！ 表示非空
    indent: 'off', // 输入const 的时候一直报错,所以加上
    '@typescript-eslint/indent': ['error', 2] // 输入const 的时候一直报错,所以加上
  }
}

// '@typescript-eslint/explicit-module-boundary-types': 'off'
