<!--
 * @Author: GZH
 * @Date: 2022-01-02 10:32:38
 * @LastEditors: GZH
 * @LastEditTime: 2022-01-02 11:54:58
 * @FilePath: \vue3-admin-ts\src\layout\components\Sidebar\SidebarMenu.vue
 * @Description:
-->
<template>
  <el-menu
    :uniqueOpened="true"
    :default-active="activeMenu"
    :background-color="settingStore.cssVar.menuBg"
    :text-color="settingStore.cssVar.menuText"
    :active-text-color="settingStore.cssVar.menuActiveText"
    router
  >
    <SidebarItem v-for="item in routes" :key="item.path" :route="item" />
  </el-menu>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SidebarItem from './SidebarItem.vue'
import { filterRoutes, generateMenus } from '@/utils/route'
import { useSettingStore } from '@/piniaStore/setting'

// 获取共享数据
const settingStore = useSettingStore()

// 获取路由
const router = useRouter()
const routes = computed(() => {
  const filterRoute = filterRoutes(router.getRoutes())
  return generateMenus(filterRoute)
})

// 默认激活项
const route = useRoute()
const activeMenu = computed(() => {
  const { meta, path } = route
  if (meta.activeMenu) {
    return meta.activeMenu
  }
  return path
})
</script>

<style lang="scss" scoped></style>
