<!--
 * @Author: GZH
 * @Date: 2021-12-29 12:25:32
 * @LastEditors: GZH
 * @LastEditTime: 2021-12-29 13:44:55
 * @FilePath: \qrcode-proj\src\components\SvgIcon\index.vue
 * @Description: 图标
-->
<template>
  <span>
    <!-- 展示外部图标 -->
    <div
      class="svg-external-icon svg-icon"
      v-if="isExternal"
      :style="styleExternalIcon"
      :class="className"
    ></div>
    <!-- 展示内部图标 -->
    <svg v-else class="svg-icon" :class="className" aria-hidden="true">
      <use :xlink:href="iconName" />
    </svg>
  </span>
</template>

<script setup lang="ts">
import { withDefaults, defineProps, computed } from 'vue'
import { isExternal as external } from '@/utils/validate'

interface Props {
  icon: string
  className?: string
}

// 设置默认值
const props = withDefaults(defineProps<Props>(), {
  className: ''
})

// 判断当前图标是否为外部图标
const isExternal = computed(() => external(props.icon))

// 外部图标样式
const styleExternalIcon = computed(() => ({
  mask: `url(${props.icon}) no-repeat 50% 50%`,
  '-webkit-mask': `url(${props.icon}) no-repeat 50% 50%`
}))

// 内部图标
const iconName = computed(() => `#icon-${props.icon}`)
</script>

<style scoped lang="scss">
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
