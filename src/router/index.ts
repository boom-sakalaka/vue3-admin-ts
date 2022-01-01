/*
 * @Author: GZH
 * @Date: 2021-12-29 11:26:16
 * @LastEditors: GZH
 * @LastEditTime: 2022-01-01 12:44:42
 * @FilePath: \vue3-admin-ts\src\router\index.ts
 * @Description:
 */
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

/* 公开路由表 */
const publicRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login/index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [...publicRoutes]
})

export default router
