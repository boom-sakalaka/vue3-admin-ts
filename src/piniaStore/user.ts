/*
 * @Author: GZH
 * @Date: 2022-01-01 17:40:51
 * @LastEditors: GZH
 * @LastEditTime: 2022-01-01 21:34:04
 * @FilePath: \vue3-admin-ts\src\piniaStore\user.ts
 * @Description: 用户数据 全局共享
 */
import { defineStore } from 'pinia'
import md5 from 'md5'
import { login } from '@/api/sys'
import type { ILoginQuery } from '@/api/sys'
import router from '@/router'
import { setItem, getItem } from '@/utils/storage'
import { TOKEN } from '@/constant'
import { setTimeStamp } from '@/utils/auth'

interface IUserStore {
  token: string
}

// 登录接口
export const useUserStore = defineStore({
  id: 'user',
  state: (): IUserStore => ({
    token: (getItem(TOKEN) as string) || ''
  }),
  getters: {},
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
    }
  }
})
