<!--
 * @Author: GZH
 * @Date: 2022-01-03 15:09:57
 * @LastEditors: GZH
 * @LastEditTime: 2022-01-03 15:27:22
 * @FilePath: \vue3-admin-ts\src\components\ThemeSelect\index.vue
 * @Description: 颜色主题选择组件
-->
<template>
  <el-dropdown v-bind="$attrs" trigger="click" class="theme" @command="handleSetTheme">
    <div>
      <el-tooltip :content="$t('msg.theme.themeChange')" placement="bottom">
        <span id="guide-theme"> <svg-icon icon="change-theme"></svg-icon></span>
      </el-tooltip>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="color">{{ $t('msg.theme.themeColorChange') }}</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <!-- 弹出层 -->
  <div>
    <select-color v-model="selectColorVisible"></select-color>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SelectColor from './components/SelectColor.vue'

const selectColorVisible = ref(false)

const handleSetTheme = () => {
  selectColorVisible.value = true
}
</script>
<style lang="scss" scoped></style>
