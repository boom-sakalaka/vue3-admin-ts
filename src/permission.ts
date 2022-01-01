/*
 * @Author: GZH
 * @Date: 2022-01-01 21:43:28
 * @LastEditors: GZH
 * @LastEditTime: 2022-01-01 22:03:16
 * @FilePath: \vue3-admin-ts\src\permission.ts
 * @Description:
 */
import router from '@/router'
import { useUserStore } from '@/piniaStore/user'

// 白名单
const whiteList = ['/login']

/**
 * 路由前置守卫
 */
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()

  if (userStore.token) {
    // 1. 用户已登录
    if (to.path === '/login') {
      next('/')
    } else {
      // 判断用户资料是否存在，如果不存在，则获取用户信息
      // if (!store.getters.hasUserInfo) {
      //   await store.dispatch('user/getUserInfo')
      // }
      next()
    }
  } else {
    // 2. 用户未登录，只允许进入白名单中的路由
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
})
