/*
 * @Author: GZH
 * @Date: 2021-12-29 16:25:44
 * @LastEditors: GZH
 * @LastEditTime: 2021-12-29 17:07:45
 * @FilePath: \qrcode-proj\src\store\getters.ts
 * @Description:
 */
import { genenrateColor } from '@/utils/theme'
import { getItem } from '@/utils/storage'
import { MAIN_COLOR } from '@/constant'
import { IUser } from './modules/user'

// 这样子的类型定义好像没什么意义，后续跟进去更改，或许会换成 Pinia ?
export interface IAllState {
  user: IUser
}

// console.warn(genenrateColor(getItem(MAIN_COLOR)))
const getters = {
  token: (state: IAllState) => state.user.token,
  hasUserInfo: (state: IAllState) => {
    return JSON.stringify(state.user.userInfo) !== '{}'
  },
  userInfo: (state: IAllState) => state.user.userInfo
  // cssVar: (state: IAllState) => ({
  //   ...state.theme.variables,
  //   ...genenrateColor(getItem(MAIN_COLOR) as string)
  // }),
  // sidebarOpened: (state: IAllState) => state.app.sidebarOpened,
  // language: (state: IAllState) => state.app.language,
  // mainColor: (state: IAllState) => state.theme.mainColor,
  // tagsViewList: (state: IAllState) => state.app.tagsViewList
}
export default getters
