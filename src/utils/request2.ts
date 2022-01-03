/*
 * @Author: GZH
 * @Date: 2021-12-29 13:53:43
 * @LastEditors: GZH
 * @LastEditTime: 2022-01-03 16:32:54
 * @FilePath: \vue3-admin-ts\src\utils\request2.ts
 * @Description: 封装登录请求 https://github.dev/buqiyuan/vue3-antd-admin
 */
import axios, { AxiosRequestConfig } from 'axios'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/piniaStore/user'
import { isCheckTimeout } from '@/utils/auth'

export interface RequestOptions {
  /*  当前接口权限，不需要接口鉴权可忽略 */
  permCode?: string
  /*  是否直接获取data，忽略message */
  isGetDataDirectly?: boolean
  /* 请求成功是否提示 */
  successMsg?: string
  /* 请求失败是否提示 */
  errorMsg?: string
  /* 是否mock请求 */
  isMock?: boolean
}

const UNKNOWN_ERROR = '未知错误，请重试'

/* 真实请求路径前缀 */
const baseUrl = process.env.VUE_APP_BASE_API as string
/* mock请求路径前缀 */
const mockUrl = process.env.VUE_APP_MOCK_API as string

const service = axios.create({
  // baseURL:
  timeout: 50000
})

service.interceptors.request.use(
  (config) => {
    const userStore = useUserStore()
    const token = userStore.token
    if (token && config.headers) {
      // 时间过期
      if (isCheckTimeout()) {
        userStore.logout()
        return Promise.reject(new Error('token 失效'))
      }
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response) => {
    const res = response.data
    if (res.code !== 200) {
      ElMessage.error(res.message || UNKNOWN_ERROR)

      const error = new Error(res.message || UNKNOWN_ERROR) as Error & { code: any }
      error.code = res.code
      return Promise.reject(error)
    } else {
      return res
    }
  },
  (error) => {
    // token 过期
    let errMsg = error.message
    if (error?.response?.data?.code === 401) {
      const userStore = useUserStore()
      userStore.logout()
      errMsg = error?.response?.data?.message ?? UNKNOWN_ERROR
    }

    // 处理 422 或者 500 的错误异常提示
    // const errMsg = error?.response?.data?.message ?? UNKNOWN_ERROR
    // ElMessage.error(errMsg)

    ElMessage.error(errMsg)
    error.message = errMsg
    return Promise.reject(error)
  }
)

export type Response<T = any> = {
  code: number
  message: string
  data: T
  success: boolean
}

export type BaseResponse<T = any> = Promise<Response<T>>

/**
 *
 * @param method - request methods
 * @param url - request url
 * @param data - request data or params
 */
export const request = async <T = any>(
  config: AxiosRequestConfig,
  options: RequestOptions = {}
): Promise<T> => {
  try {
    const { successMsg, errorMsg, permCode, isMock, isGetDataDirectly = true } = options
    // 如果当前是需要鉴权的接口 并且没有权限的话 则终止请求发起
    // !useUserStore().perms.includes(permCode)
    if (permCode) {
      ElMessage.error('你没有访问该接口的权限，请联系管理员！')
      return Promise.reject(new Error('e'))
    }
    const fullUrl = `${(isMock ? mockUrl : baseUrl) + '/' + config.url}`
    config.url = fullUrl.replace(/(?<!:)\/{2,}/g, '/')

    const res = await service.request(config)
    successMsg && ElMessage.success(successMsg)
    errorMsg && ElMessage.error(errorMsg)
    return isGetDataDirectly ? res.data : res
  } catch (error: any) {
    return Promise.reject(error)
  }
}
