/*
 * @Author: GZH
 * @Date: 2021-12-29 14:50:57
 * @LastEditors: GZH
 * @LastEditTime: 2021-12-29 16:15:58
 * @FilePath: \qrcode-proj\src\store\modules\user.ts
 * @Description:
 */
import { login, getUserInfo } from '@/api/sys'
import md5 from 'md5'
import { setItem, getItem, removeAllItem } from '@/utils/storage'
import { TOKEN } from '@/constant'
import router from '@/router'
import { setTimeStamp } from '@/utils/auth'

export interface IPassword {
  username?: string
  password?: string
}

export interface IUser {
  token: string
  // eslint-disable-next-line @typescript-eslint/ban-types
  userInfo: IPassword
}

export default {
  namespaced: true,
  state: (): IUser => ({
    token: (getItem(TOKEN) as string) || '',
    userInfo: {}
  }),
  mutations: {
    setToken(state: IUser, token: string): void {
      state.token = token
      setItem(TOKEN, token)
    },
    setUserInfo(state: IUser, userInfo: IPassword): void {
      state.userInfo = userInfo
    }
  },
  actions: {
    login(context: any, userInfo: IPassword): Promise<string> {
      const { username, password } = userInfo
      return new Promise((resolve, reject) => {
        login<{ token: string }>({
          username,
          password: md5(password as string)
        })
          .then((data) => {
            context.commit('setToken', data.token)
            router.push('/')

            // 保存登录时间
            setTimeStamp()

            resolve('')
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    async getUserInfo(context: any): Promise<any> {
      const res = await getUserInfo()

      context.commit('setUserInfo', res)
      return res
    },
    // 退出登录
    /* eslint-disable */
    logout(): void {
      // @ts-ignore
      this.commit('user/setToken', '')
      // @ts-ignore
      this.commit('user/setUserInfo', {})
      // @ts-ignore
      this.commit('app/setTagsViewList', [])
      removeAllItem()
      // todo 清理权限相关的数据
      router.push('/login')
    }
  }
}
