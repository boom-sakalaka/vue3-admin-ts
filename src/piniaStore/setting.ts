/*
 * @Author: GZH
 * @Date: 2022-01-02 11:48:40
 * @LastEditors: GZH
 * @LastEditTime: 2022-01-02 11:51:45
 * @FilePath: \vue3-admin-ts\src\piniaStore\setting.ts
 * @Description:
 */
import { defineStore } from 'pinia'
import variables from '@/styles/variables.scss'

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
}

export const useSettingStore = defineStore({
  id: 'setting',
  state: (): ISettingStore => ({
    cssVar: variables
  })
})
