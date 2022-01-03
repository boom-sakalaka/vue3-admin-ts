/*
 * @Author: GZH
 * @Date: 2022-01-01 17:40:51
 * @LastEditors: GZH
 * @LastEditTime: 2022-01-03 11:12:01
 * @FilePath: \vue3-admin-ts\src\piniaStore\user.ts
 * @Description: 用户数据 全局共享
 */
import { defineStore } from 'pinia'
import md5 from 'md5'
import { login, getUserInfo, IUserInfo } from '@/api/sys'
import type { ILoginQuery } from '@/api/sys'
import router from '@/router'
import { setItem, getItem, removeAllItem } from '@/utils/storage'
import { TOKEN, LANG } from '@/constant'
import { setTimeStamp } from '@/utils/auth'

interface IUserStore {
  token: string
  userInfo: IUserInfo
}

// 登录接口
export const useUserStore = defineStore({
  id: 'user',
  state: (): IUserStore => ({
    token: (getItem(TOKEN) as string) || '',
    userInfo: {}
  }),
  getters: {
    hasUserInfo: (state) => {
      return JSON.stringify(state.userInfo) !== '{}'
    }
  },
  actions: {
    /* 登录操作 */
    login(userInfo: ILoginQuery) {
      const { username, password } = userInfo
      return new Promise((resolve, reject) => {
        login({ username, password: md5(password) })
          .then((res) => {
            const { token } = res
            // 存在全局store
            this.token = token

            // 保存在本地
            setItem(TOKEN, token)

            // 保存登录时间
            setTimeStamp()

            // 跳转路由
            router.push('/')

            resolve('')
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    /* 获取用户信息 */
    async getUserInfo() {
      const res = await getUserInfo()
      this.userInfo = res
      return res
    },
    logout() {
      this.token = ''
      this.userInfo = {}
      // 除了国际化的，其余全部删除本地数据缓存
      removeAllItem([LANG])

      // TODO 权限相关
      router.push('/login')
    }
  }
})
