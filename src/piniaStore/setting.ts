/*
 * @Author: GZH
 * @Date: 2022-01-02 11:48:40
 * @LastEditors: GZH
 * @LastEditTime: 2022-01-03 10:16:14
 * @FilePath: \vue3-admin-ts\src\piniaStore\setting.ts
 * @Description:
 */
import { defineStore } from 'pinia'
import variables from '@/styles/variables.scss'
import { getItem, setItem } from '@/utils/storage'
import { LANG } from '@/constant'

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
  cssVar: ICssVarData
  sidebarOpened: boolean
  language: string
}

export const useSettingStore = defineStore({
  id: 'setting',
  state: (): ISettingStore => ({
    cssVar: variables,
    sidebarOpened: true,
    language: (getItem(LANG) as string) || 'zh'
  }),
  actions: {
    triggerSidebarOpened() {
      this.sidebarOpened = !this.sidebarOpened
    },
    setLanguage(lang: string) {
      setItem(LANG, lang)
      this.language = lang
    }
  }
})
