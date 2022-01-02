/*
 * @Author: GZH
 * @Date: 2022-01-02 11:02:19
 * @LastEditors: GZH
 * @LastEditTime: 2022-01-02 11:30:13
 * @FilePath: \vue3-admin-ts\src\utils\route.ts
 * @Description:
 */
/*
 * @Author: GZH
 * @Date: 2021-12-08 22:04:40
 * @LastEditors: GZH
 * @LastEditTime: 2021-12-08 23:07:53
 * @FilePath: \vue3-admin\src\utils\route.js
 * @Description:
 */

import path from 'path'
import { RouteRecordRaw } from 'vue-router'

const getChildrenRoutes = (routes: RouteRecordRaw[]) => {
  const result: RouteRecordRaw[] = []
  routes.forEach((route) => {
    if (route.children && route.children.length > 0) {
      result.push(...route.children)
    }
  })
  return result
}

/**
 * 处理脱离层级的路由
 */
export const filterRoutes = (routes: RouteRecordRaw[]): RouteRecordRaw[] => {
  // 所有的子集路由
  const childrenRouters = getChildrenRoutes(routes)
  // 根据子集路由进行查重操作
  return routes.filter((route) => {
    // 根据 route 在 childrenRoutes 中进行查重，把所有重复路由表剔除
    return !childrenRouters.find((childrenRouter) => {
      return childrenRouter.path === route.path
    })
  })
}

function isNull(data: unknown) {
  if (!data) return true
  if (JSON.stringify(data) === '{}') return true
  if (JSON.stringify(data) === '[]') return true
}

/**
 * 根据router 数据，返回对应的menu规则数据,就是要显示在 menu菜单上的路由
 */
export const generateMenus = (routes: RouteRecordRaw[], basePath = ''): RouteRecordRaw[] => {
  const result: RouteRecordRaw[] = []
  routes.forEach((item: RouteRecordRaw) => {
    // 不存在 children 和 meta 直接return
    if (isNull(item.children) && isNull(item.meta)) return
    // 存在 children，不存在mete，迭代 generateMenus
    if (isNull(item.meta) && !isNull(item.children)) {
      result.push(...generateMenus(item.children as RouteRecordRaw[]))
      return
    }

    // 不存在 children,存在meta || 存在 children
    // 应为最终的menu需要跳转 此时我们需要合并 path
    const routePath = path.resolve(basePath, item.path)
    // 路由分离后，可能存在同名 父路由的情况
    let route = result.find((item) => item.path === routePath)
    // 当前路由尚未 加入到result
    if (!route) {
      route = {
        ...item,
        path: routePath,
        children: []
      }

      if (route?.meta?.icon && route.meta.title) {
        result.push(route)
      }
    }

    // 存在children
    if (!isNull(item.children)) {
      route.children!.push(...generateMenus(item.children!, route.path))
    }
  })
  return result
}
