<!--
 * @Author: GZH
 * @Date: 2021-12-29 11:26:16
 * @LastEditors: GZH
 * @LastEditTime: 2022-01-03 11:28:00
 * @FilePath: \vue3-admin-ts\src\App.vue
 * @Description:
-->
<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<script lang="ts" setup>
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'
import { computed } from 'vue'
import { useSettingStore } from '@/piniaStore/setting'

const settingStore = useSettingStore()

// element-plus i18n 全局国际化处理
const locale = computed(() => (settingStore.language === 'en' ? en : zhCn))
</script>

<style></style>
