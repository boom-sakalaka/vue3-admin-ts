/*
 * @Author: GZH
 * @Date: 2021-12-29 13:53:43
 * @LastEditors: GZH
 * @LastEditTime: 2021-12-29 14:19:20
 * @FilePath: \qrcode-proj\src\utils\request.ts
 * @Description:封装登录请求
 */
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'
import store from '@/store'
import { isCheckTimeout } from '@/utils/auth'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 50000
})

// 请求拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // 注入token
    if (store.getters.token) {
      // 时间过期
      if (isCheckTimeout()) {
        store.dispatch('user/logout')
        return Promise.reject(new Error('token 失效'))
      }
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      config.headers!.Authorization = `Bearer ${store.getters.token}`
    }
  },
  (err: AxiosError) => {
    return Promise.reject(err)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { success, message, data } = response.data
    // 需要判断当前请求是否成功
    if (success) {
      // 成功后返回解析后的数据
      return data
    } else {
      // 失败(请求成功，业务失败)
      ElMessage.error(message)
      return Promise.reject(new Error(message))
    }
  },
  (err) => {
    // token 过期
    if (err?.response?.data?.code === 401) {
      store.dispatch('user/logout')
    }
    ElMessage.error(err.message)
    return Promise.reject(err)
  }
)

export default service
