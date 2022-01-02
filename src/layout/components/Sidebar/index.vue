<!--
 * @Author: GZH
 * @Date: 2022-01-01 22:21:33
 * @LastEditors: GZH
 * @LastEditTime: 2022-01-02 17:44:16
 * @FilePath: \vue3-admin-ts\src\layout\components\Sidebar\index.vue
 * @Description:
-->
<template>
  <div>
    <div class="logo-container">
      <el-avatar
        :size="logoHeight"
        shape="square"
        :src="userStore.userInfo.avatar + '1'"
      ></el-avatar>
      <h1 class="logo-title" v-if="settingStore.sidebarOpened">i-admin</h1>
    </div>
    <el-scrollbar>
      <sidebar-menu></sidebar-menu>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import SidebarMenu from './SidebarMenu.vue'
import { useUserStore } from '@/piniaStore/user'
import { useSettingStore } from '@/piniaStore/setting'

const userStore = useUserStore()
const settingStore = useSettingStore()
const logoHeight = 44
</script>
<style lang="scss" scoped>
.logo-container {
  height: v-bind(logoHeight) + 'px';
  padding: 10px 0 22px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  .logo-title {
    margin-left: 10px;
    color: #fff;
    font-weight: 600;
    line-height: 50px;
    font-size: 16px;
    white-space: nowrap;
  }

  .el-avatar {
    --el-avatar-background-color: none;
    margin-right: 12px;
  }
}
</style>
