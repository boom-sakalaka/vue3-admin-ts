<!--
 * @Author: GZH
 * @Date: 2022-01-02 11:33:49
 * @LastEditors: GZH
 * @LastEditTime: 2022-01-03 14:29:33
 * @FilePath: \vue3-admin-ts\src\layout\components\Sidebar\SidebarItem.vue
 * @Description:
-->
<template>
  <el-sub-menu v-if="route.children!.length > 0" :index="route.path">
    <template #title>
      <menu-item :title="route.meta!.title!" :icon="route.meta!.icon!"></menu-item>
    </template>

    <sidebar-item v-for="item in route.children" :key="item.path" :route="item"></sidebar-item>
  </el-sub-menu>
  <el-menu-item v-else :index="route.path">
    <menu-item :title="route.meta!.title!" :icon="route.meta!.icon!"></menu-item>
  </el-menu-item>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { RouteRecordRaw } from 'vue-router'
import MenuItem from './MenuItem.vue'

defineProps<{
  route: RouteRecordRaw
}>()
</script>
<style lang="scss" scoped></style>
