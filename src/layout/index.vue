<!--
 * @Author: GZH
 * @Date: 2022-01-01 21:40:58
 * @LastEditors: GZH
 * @LastEditTime: 2022-01-01 22:45:39
 * @FilePath: \vue3-admin-ts\src\layout\index.vue
 * @Description: 框架页面
-->
<template>
  <div class="app-wrapper">
    <!-- 左侧mune -->
    <sidebar
      id="guide-sidebar"
      class="sidebar-container"
      :style="{ backgroundColor: variables.menuBg }"
    />
    <div class="main-container">
      <div class="fixed-header">
        <!-- 顶部navbar -->
        <navbar />
        <!-- tags -->
        <!-- <tag-view id="guide-tags"></tag-view> -->
      </div>
      <!-- 内容区 -->
      <app-main />
    </div>
  </div>
</template>

<script setup lang="ts">
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar/index.vue'
import AppMain from './components/AppMain.vue'
import variables from '@/styles/variables.scss'
</script>
<style lang="scss" scoped>
@import '../styles/mixin.scss';
@import '../styles/variables.scss';

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width #{$sideBarDuration};
}
.hideSidebar {
  .fixed-header {
    width: calc(100% - #{$hideSideBarWidth});
  }
}
</style>
