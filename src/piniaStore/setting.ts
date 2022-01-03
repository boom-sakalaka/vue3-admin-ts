/*
 * @Author: GZH
 * @Date: 2022-01-02 11:48:40
 * @LastEditors: GZH
 * @LastEditTime: 2022-01-03 16:22:55
 * @FilePath: \vue3-admin-ts\src\piniaStore\setting.ts
 * @Description: 全局配置
 */
import { defineStore } from 'pinia'
import variables from '@/styles/variables.scss'
import { getItem, setItem } from '@/utils/storage'
import { LANG, MAIN_COLOR, DEFAULT_COLOR } from '@/constant'
import { genenrateColor } from '@/utils/theme'

interface ICssVarData {
  menuText: string
  menuActiveText: string
  subMenuActiveText: string
  menuBg: string
  menuHover: string
  subMenuBg: string
  subMenuHover: string
  sideBarWidth: string
}

interface ISettingStore {
  sidebarOpened: boolean
  language: string
  mainColor: string
  variables: ICssVarData
}

export const useSettingStore = defineStore({
  id: 'setting',
  state: (): ISettingStore => ({
    variables: variables,
    sidebarOpened: true,
    language: (getItem(LANG) as string) || 'zh',
    mainColor: (getItem(MAIN_COLOR) as string) || DEFAULT_COLOR
  }),
  getters: {
    cssVar: (state): ICssVarData => {
      return {
        ...state.variables,
        ...genenrateColor(state.mainColor)
      }
    }
  },
  actions: {
    triggerSidebarOpened() {
      this.sidebarOpened = !this.sidebarOpened
    },
    setLanguage(lang: string) {
      setItem(LANG, lang)
      this.language = lang
    },
    setMainColor(newColor: string) {
      this.mainColor = newColor
      this.variables.menuBg = newColor
      setItem(MAIN_COLOR, newColor)
    }
  }
})
