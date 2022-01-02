<!--
 * @Author: GZH
 * @Date: 2022-01-02 12:14:51
 * @LastEditors: GZH
 * @LastEditTime: 2022-01-02 16:55:10
 * @FilePath: \vue3-admin-ts\src\components\hamburger\index.vue
 * @Description: 左侧菜单栏的伸缩显示
-->
<template>
  <div class="hamburger-contain" @click="toggleClick">
    <svg-icon :icon="icon" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useSettingStore } from '@/piniaStore/setting'

const settingStore = useSettingStore()
const icon = computed(() => {
  return settingStore.sidebarOpened ? 'hamburger-opened' : 'hamburger-closed'
})

const toggleClick = () => {
  settingStore.triggerSidebarOpened()
}
</script>
<style lang="scss" scoped>
.hamburger-contain {
  padding: 0 16px;
}
</style>
