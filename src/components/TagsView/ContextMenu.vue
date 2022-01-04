<!--
 * @Author: GZH
 * @Date: 2022-01-04 15:08:44
 * @LastEditors: GZH
 * @LastEditTime: 2022-01-04 15:14:00
 * @FilePath: \vue3-admin-ts\src\components\TagsView\ContextMenu.vue
 * @Description:右键菜单
-->
<template>
  <ul class="context-menu-container">
    <li @click="onRefreshClick">{{ $t('msg.tagsView.refresh') }}</li>
    <li @click="onCloseRightClick">{{ $t('msg.tagsView.closeRight') }}</li>
    <li @click="onCloseOtherClick">{{ $t('msg.tagsView.closeOther') }}</li>
  </ul>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'
import { useSettingStore } from '@/piniaStore/setting'

const props = defineProps<{ index: number }>()

/* 刷新 */
const router = useRouter()
const onRefreshClick = () => {
  router.go(0)
}

const settingStore = useSettingStore()
// 关闭右侧
const onCloseRightClick = () => {
  settingStore.removeTagsView({
    type: 'right',
    index: props.index
  })
}

// 关闭其它
const onCloseOtherClick = () => {
  settingStore.removeTagsView({
    type: 'other',
    index: props.index
  })
}
</script>
<style lang="scss" scoped>
.context-menu-container {
  position: fixed;
  background: #fff;
  z-index: 3000;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
  li {
    margin: 0;
    padding: 7px 16px;
    cursor: pointer;
    &:hover {
      background: #eee;
    }
  }
}
</style>
