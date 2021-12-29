/*
 * @Author: GZH
 * @Date: 2021-12-29 16:25:44
 * @LastEditors: GZH
 * @LastEditTime: 2021-12-29 16:43:20
 * @FilePath: \qrcode-proj\src\store\getters.ts
 * @Description:
 */
import { genenrateColor } from '@/utils/theme'
import { getItem } from '@/utils/storage'
import { MAIN_COLOR } from '@/constant'

// console.warn(genenrateColor(getItem(MAIN_COLOR)))
const getters = {
  token: (state: any) => state.user.token,
  hasUserInfo: (state: any) => {
    return JSON.stringify(state.user.userInfo) !== '{}'
  },
  userInfo: (state: any) => state.user.userInfo,
  cssVar: (state: any) => ({
    ...state.theme.variables,
    ...genenrateColor(getItem(MAIN_COLOR) as string)
  }),
  sidebarOpened: (state: any) => state.app.sidebarOpened,
  language: (state: any) => state.app.language,
  mainColor: (state: any) => state.theme.mainColor,
  tagsViewList: (state: any) => state.app.tagsViewList
}
export default getters
