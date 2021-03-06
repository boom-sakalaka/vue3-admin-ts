/*
 * @Author: GZH
 * @Date: 2021-12-29 14:51:36
 * @LastEditors: GZH
 * @LastEditTime: 2022-01-01 23:01:45
 * @FilePath: \vue3-admin-ts\src\api\sys.ts
 * @Description:
 */
import { request } from '@/utils/request2'

interface ILoginInData {
  token: string
}

export interface ILoginQuery {
  username: string
  password: string
}

export interface IUserInfo {
  avatar?: string
}

/** 登录请求 */
export const login = (data: ILoginQuery): Promise<ILoginInData> => {
  return request<ILoginInData>({
    url: 'sys/login',
    method: 'POST',
    data
  })
}

/* 获取用户信息 */
export const getUserInfo = (): Promise<IUserInfo> => {
  return request<IUserInfo>({
    url: 'sys/profile',
    method: 'GET'
  })
}
