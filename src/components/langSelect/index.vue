<!--
 * @Author: GZH
 * @Date: 2022-01-03 10:33:00
 * @LastEditors: GZH
 * @LastEditTime: 2022-01-03 14:10:15
 * @FilePath: \vue3-admin-ts\src\components\langSelect\index.vue
 * @Description:
-->

<template>
  <el-dropdown class="international" trigger="click" @command="handleSetLanguage">
    <el-tooltip content="国际化" placement="bottom" :effect="effect">
      <span id="guide-lang"><svg-icon icon="language" /></span>
    </el-tooltip>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :disabled="language === 'zh'" command="zh"> 中文 </el-dropdown-item>
        <el-dropdown-item :disabled="language === 'en'" command="en"> English </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { computed, withDefaults, defineProps } from 'vue'
import { useSettingStore } from '@/piniaStore/setting'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'

interface Props {
  effect?: 'dark' | 'light'
}

// 设置默认值
withDefaults(defineProps<Props>(), {
  effect: 'dark'
})

// 切换语言相关
const settingStore = useSettingStore()
const language = computed(() => settingStore.language)
const i18n = useI18n()

const handleSetLanguage = (lang: string): void => {
  // 切换i18n 的语言方法
  i18n.locale.value = lang
  settingStore.setLanguage(lang)
  // 提示
  ElMessage.success(i18n.t('msg.toast.switchLangSuccess'))
}
</script>
<style lang="scss" scoped></style>
