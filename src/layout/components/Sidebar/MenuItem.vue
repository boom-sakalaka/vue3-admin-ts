<!--
 * @Author: GZH
 * @Date: 2022-01-02 11:34:05
 * @LastEditors: GZH
 * @LastEditTime: 2022-01-02 11:42:59
 * @FilePath: \vue3-admin-ts\src\layout\components\Sidebar\MenuItem.vue
 * @Description:
-->
<template>
  <i v-if="icon.includes('el-icon')" class="sub-el-icon" :class="icon"></i>
  <svg-icon v-else :icon="icon" />
  <span>{{ title }}</span>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
defineProps<{
  title: string
  icon: string
}>()
</script>
<style lang="scss" scoped></style>
