<!--
 * @Author: GZH
 * @Date: 2022-01-04 13:46:41
 * @LastEditors: GZH
 * @LastEditTime: 2022-01-04 21:21:52
 * @FilePath: \vue3-admin-ts\src\components\TagsView\index.vue
 * @Description:
-->
<template>
  <div class="tags-view-container">
    <!-- <router-link
      v-for="(tag, index) in settingStore.tagsViewList"
      :key="tag.fullPath"
      class="tags-view-item"
      :class="isActive(tag) ? 'active' : ''"
      :to="{ path: tag.fullPath }"
      :style="{
        backgroundColor: isActive(tag) ? settingStore.cssVar.menuBg : '',
        borderColor: isActive(tag) ? settingStore.cssVar.menuBg : ''
      }"
      @contextmenu.prevent="openMenu($event, index)"
      >{{ tag.title }}
      <i v-show="!isActive(tag)" class="el-icon-close" @click.prevent.stop="onCloseClick"></i>
    </router-link> -->
    <el-tabs type="border-card" v-model="activepath">
      <el-tab-pane v-for="(tag, index) in settingStore.tagsViewList" :key="tag.fullPath">
        <template #label>
          <router-link
            :key="tag.fullPath"
            class="tags-view-item"
            :class="isActive(tag) ? 'active' : ''"
            :to="{ path: tag.fullPath }"
            :style="{
              backgroundColor: isActive(tag) ? settingStore.cssVar.menuBg : '',
              borderColor: isActive(tag) ? settingStore.cssVar.menuBg : ''
            }"
            @contextmenu.prevent="openMenu($event, index)"
            >{{ tag.title }}
            <i
              v-show="!isActive(tag)"
              class="el-icon-close"
              @click.prevent.stop="onCloseClick(index)"
            ></i>
          </router-link>
        </template>
      </el-tab-pane>
    </el-tabs>
    <context-menu v-show="visible" :style="menuStyle" :index="selectIndex"></context-menu>
  </div>
</template>

<script setup lang="ts">
import { computed, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useSettingStore, ITagsView } from '@/piniaStore/setting'
import ContextMenu from './ContextMenu.vue'

interface IMenuStyle {
  left: string | number
  top: string | number
}

interface IEvent {
  x: number
  y: number
}

const settingStore = useSettingStore()

/* 判断是否是选中的 */
const route = useRoute()
const isActive = (tag: ITagsView) => {
  return tag.path === route.path
}

const activepath = computed(() => route.path)

// 鼠标右键
const visible = ref<boolean>(false)
const menuStyle = ref<IMenuStyle>({
  left: 0,
  top: 0
})
const selectIndex = ref<number>(0)
const openMenu = (e: IEvent, index: number) => {
  const { x, y } = e
  menuStyle.value.left = x + 'px'
  menuStyle.value.top = y + 'px'
  visible.value = true
  selectIndex.value = index
}

// 关闭tag的事件
const onCloseClick = (index: number) => {
  settingStore.removeTagsView({
    type: 'index',
    index: index
  })
}

const closeMenu = () => {
  visible.value = false
}

watch(visible, (val) => {
  if (val) {
    document.body.addEventListener('click', closeMenu)
  } else {
    document.body.removeEventListener('click', closeMenu)
  }
})

onUnmounted(() => {
  document.body.removeEventListener('click', closeMenu)
})
</script>
<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  .tags-view-item {
    display: inline-block;
    position: relative;
    cursor: pointer;
    height: 26px;
    line-height: 26px;
    border: 1px solid #d8dce5;
    color: #495060;
    background: #fff;
    padding: 0 8px;
    font-size: 12px;
    margin-left: 5px;
    margin-top: 4px;
    &.first-of-type {
      margin-left: 15px;
    }
    &.last-of-type {
      margin-right: 15px;
    }
    &.active {
      color: #fff;
      &::before {
        content: '';
        background: #fff;
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        position: relative;
        margin-right: 4px;
      }
    }
    .el-icon-close {
      width: 16px;
      height: 16px;
      line-height: 10px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.353, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
  :deep(.el-tabs__content) {
    padding: 0;
  }
  :deep(.el-tabs__item) {
    padding: 0 !important;
  }
}
</style>
