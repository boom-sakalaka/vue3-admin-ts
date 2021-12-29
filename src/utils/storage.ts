/*
 * @Author: GZH
 * @Date: 2021-11-14 17:30:17
 * @LastEditors: GZH
 * @LastEditTime: 2021-12-29 14:06:32
 * @FilePath: \qrcode-proj\src\utils\storage.ts
 * @Description: localStorage 的使用
 */

/**
 * 存取数据
 */
export const setItem = (key: string, value: unknown): void => {
  // value 分为两种情况，一种为基本数据类型，一种为复杂数据类型
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value as string)
}

/**
 * 获取数据
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export const getItem = (key: string): string | object | number | boolean => {
  const data = window.localStorage.getItem(key)
  try {
    return JSON.parse(data as string)
  } catch (err) {
    return data as string
  }
}

/**
 * 删除指定数据
 */
export const removeItem = (key: string): void => {
  window.localStorage.removeItem(key)
}

/**
 * 删除所有数据
 */
export const removeAllItem = (): void => {
  window.localStorage.clear()
}
