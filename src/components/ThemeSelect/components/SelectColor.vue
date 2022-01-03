<!--
 * @Author: GZH
 * @Date: 2022-01-03 15:23:45
 * @LastEditors: GZH
 * @LastEditTime: 2022-01-03 15:39:28
 * @FilePath: \vue3-admin-ts\src\components\ThemeSelect\components\SelectColor.vue
 * @Description: 选择颜色
-->
<template>
  <el-dialog
    :title="$t('msg.universal.title')"
    :model-value="modelValue"
    @close="closed"
    width="22%"
  >
    <div class="content">
      <p class="title">{{ $t('msg.theme.themeColorChange') }}</p>
      <el-color-picker v-model="myColor" :predefine="predefineColors" />
    </div>
    <template #footer>
      <el-button @click="closed">
        {{ $t('msg.universal.cancel') }}
      </el-button>

      <el-button type="primary" @click="comfirm">
        {{ $t('msg.universal.confirm') }}
      </el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue'
import { useSettingStore } from '@/piniaStore/setting'
import { generateNewStyle, writeNewStyle } from '@/utils/theme'

defineProps<{
  modelValue: boolean
}>()

// eslint-disable-next-line func-call-spacing
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const closed = () => {
  emit('update:modelValue', false)
}

/* 点击确定按钮，把数据存在全局状态管理组件中 */
const settingStore = useSettingStore()
const myColor = ref(settingStore.mainColor)
const comfirm = async () => {
  const newStyle = await generateNewStyle(myColor.value)
  writeNewStyle(newStyle)
  settingStore.setMainColor(myColor.value)
  closed()
}

const predefineColors = [
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255,69,0,0.68)',
  'rgb(255,120,0)',
  'hsv(51,100,98)',
  'hsva(120,40,94,0.5)',
  'hsl(181,100%,37%)',
  'hsla(209,100%,56%,0.73)',
  '#c7158577'
]
</script>

<style lang="scss" scoped>
.content {
  text-align: center;
  .title {
    margin-bottom: 12px;
  }
}
</style>
