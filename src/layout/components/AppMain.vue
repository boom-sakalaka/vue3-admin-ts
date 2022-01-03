<!--
 * @Author: GZH
 * @Date: 2022-01-01 22:22:26
 * @LastEditors: GZH
 * @LastEditTime: 2022-01-03 10:31:34
 * @FilePath: \vue3-admin-ts\src\layout\components\AppMain.vue
 * @Description:
-->

<template>
  <div class="app-main">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts"></script>
<style lang="scss" scoped>
.app-main {
  min-height: calc(100vh - 50px - 43px);
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 104px 20px 20px 20px;
  box-sizing: border-box;
}
</style>
