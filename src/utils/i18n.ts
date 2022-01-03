/*
 * @Author: GZH
 * @Date: 2022-01-03 13:53:57
 * @LastEditors: GZH
 * @LastEditTime: 2022-01-03 14:19:54
 * @FilePath: \vue3-admin-ts\src\utils\i18n.ts
 * @Description:
 */
import i18n from '@/i18n'
import { useSettingStore } from '@/piniaStore/setting'
import { watch } from 'vue'
export function generateTitle(title: string): string {
  return i18n.global.t('msg.route.' + title)
}

type TCbs = (key: string) => {}
export function watchSwitchLang(...cbs: TCbs[]): void {
  const settingStore = useSettingStore()
  watch(
    () => settingStore.language,
    () => {
      cbs.forEach((cb) => cb(settingStore.language))
    }
  )
}
