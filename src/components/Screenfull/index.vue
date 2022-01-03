<!--
 * @Author: GZH
 * @Date: 2022-01-03 20:48:23
 * @LastEditors: GZH
 * @LastEditTime: 2022-01-03 21:04:49
 * @FilePath: \vue3-admin-ts\src\components\Screenfull\index.vue
 * @Description:
-->
<template>
  <div @click="onToggle">
    <svg-icon :icon="isFullscreen ? 'exit-fullscreen' : 'fullscreen'"></svg-icon>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import screenfull from 'screenfull'

// 是否是全屏
const isFullscreen = ref(false)
const onToggle = () => {
  if (screenfull.isEnabled) {
    screenfull.toggle()
  }
}

const change = () => {
  if (screenfull.isEnabled) {
    isFullscreen.value = screenfull.isFullscreen
  }
}

// on 监听screenfull
onMounted(() => {
  if (screenfull.isEnabled) {
    screenfull.on('change', change)
  }
})
// off 取消监听
onUnmounted(() => {
  if (screenfull.isEnabled) {
    screenfull.off('change', change)
  }
})
</script>
<style lang="scss" scoped></style>
