/*
 * @Author: GZH
 * @Date: 2022-01-01 17:40:51
 * @LastEditors: GZH
 * @LastEditTime: 2022-01-01 18:25:13
 * @FilePath: \vue3-admin-ts\src\piniaStore\user.ts
 * @Description:
 */
import { defineStore } from 'pinia'

interface IUserStore {
  token: string
}

// 登录接口
export const useUserStore = defineStore({
  id: 'user',
  state: (): IUserStore => ({
    token: 'test'
  }),
  getters: {},
  actions: {
    changeToken() {
      this.token = 'changeToken11'
    }
  }
})
