/*
 * @Author: GZH
 * @Date: 2022-01-02 11:48:40
 * @LastEditors: GZH
 * @LastEditTime: 2022-01-04 16:11:38
 * @FilePath: \vue3-admin-ts\src\piniaStore\setting.ts
 * @Description: 全局配置
 */
import { defineStore } from 'pinia'
import variables from '@/styles/variables.scss'
import { getItem, setItem } from '@/utils/storage'
import { LANG, MAIN_COLOR, DEFAULT_COLOR, TAGS_VIEW } from '@/constant'
import { genenrateColor } from '@/utils/theme'
import { LocationQuery, RouteRecordName } from 'vue-router'

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

interface IMate {
  title?: string
  icon?: string
}

export interface ITagsView {
  fullPath: string
  meta: IMate
  name: RouteRecordName | null | undefined
  params: object
  path: string
  query: LocationQuery
  title: string
}

interface ISettingStore {
  sidebarOpened: boolean
  language: string
  mainColor: string
  variables: ICssVarData
  tagsViewList: ITagsView[]
}

interface IChangeTags {
  index: number
  tag: ITagsView
}

type TPayloadType = 'index' | 'other' | 'right'

interface IPayloadType {
  index: number
  type: TPayloadType
}

export const useSettingStore = defineStore({
  id: 'setting',
  state: (): ISettingStore => ({
    variables: variables,
    sidebarOpened: true,
    language: (getItem(LANG) as string) || 'zh',
    mainColor: (getItem(MAIN_COLOR) as string) || DEFAULT_COLOR,
    tagsViewList: (getItem(TAGS_VIEW) as ITagsView[]) || []
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
    },
    /* 设置tags */
    setTagsViewList(newTagsViews: ITagsView[]) {
      this.tagsViewList = newTagsViews
      setItem(TAGS_VIEW, this.tagsViewList)
    },
    addTagsViewList(tag: ITagsView) {
      const isFind = this.tagsViewList.find((item) => item.path === tag.path)
      /* 处理重复 */
      if (!isFind) {
        this.tagsViewList.push(tag)
        setItem(TAGS_VIEW, this.tagsViewList)
      }
    },
    /*     为指定的 tag 修改Title */
    changeTagView({ index, tag }: IChangeTags) {
      this.tagsViewList[index] = tag
      setItem(TAGS_VIEW, this.tagsViewList)
    },

    /* 删除tag操作 */
    removeTagsView(payload: IPayloadType) {
      if (payload.type === 'index') {
        this.tagsViewList.splice(payload.index, 1)
      } else if (payload.type === 'other') {
        this.tagsViewList.splice(payload.index + 1, this.tagsViewList.length - payload.index + 1)
        this.tagsViewList.splice(0, payload.index)
      } else if (payload.type === 'right') {
        this.tagsViewList.splice(payload.index + 1, this.tagsViewList.length - payload.index + 1)
      }

      setItem(TAGS_VIEW, this.tagsViewList)
    }
  }
})
