/*
 * @Author: GZH
 * @Date: 2022-01-03 10:09:24
 * @LastEditors: GZH
 * @LastEditTime: 2022-01-03 10:26:56
 * @FilePath: \vue3-admin-ts\src\i18n\index.ts
 * @Description:
 */

/* 创建数据源 */
import { createI18n } from 'vue-i18n'
import zhLocale from './lang/zh'
import enLocale from './lang/en'
import { getItem } from '@/utils/storage'
import { LANG } from '@/constant'

const messages = {
  en: {
    msg: {
      ...enLocale
    }
  },
  zh: {
    msg: {
      ...zhLocale
    }
  }
}

function getLanguage(): string {
  return (getItem(LANG) as string) || 'zh'
}

const i18n = createI18n({
  // 使用 composition API
  legacy: false,
  // 全局使用 t函数
  globalInjection: true,
  locale: getLanguage(),
  messages
})

export default i18n
