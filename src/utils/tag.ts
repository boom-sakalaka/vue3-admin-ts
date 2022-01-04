/*
 * @Author: GZH
 * @Date: 2022-01-04 13:49:18
 * @LastEditors: GZH
 * @LastEditTime: 2022-01-04 13:50:44
 * @FilePath: \vue3-admin-ts\src\utils\tag.ts
 * @Description: tagsView 使用的方法
 */
const whiteList = ['/login', '/404', '/401']
export function isTags(path: string): boolean {
  return !whiteList.includes(path)
}
