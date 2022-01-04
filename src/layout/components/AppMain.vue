<!--
 * @Author: GZH
 * @Date: 2022-01-01 22:22:26
 * @LastEditors: GZH
 * @LastEditTime: 2022-01-04 21:31:06
 * @FilePath: \vue3-admin-ts\src\layout\components\AppMain.vue
 * @Description:
-->

<template>
  <div class="app-main">
    <router-view v-slot="{ Component, route }">
      <transition name="fade-transform" mode="out-in">
        <keep-alive>
          <component :is="Component" :key="route.path"></component>
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { RouteLocationNormalizedLoaded, useRoute } from 'vue-router'
import { isTags } from '@/utils/tag'
import { useSettingStore, ITagsView } from '@/piniaStore/setting'
import { generateTitle, watchSwitchLang } from '@/utils/i18n'

/* 生成title */
const getTitle = (route: RouteLocationNormalizedLoaded | ITagsView) => {
  let title = ''

  if (!route.meta) {
    const pathArr = route.path.split('/')
    title = pathArr[pathArr.length - 1]
  } else {
    title = generateTitle(route.meta.title as string)
  }

  return title
}

// 获取全局共享状态
const settingStore = useSettingStore()
const route = useRoute()
// 监听路由变化
watch(
  route,
  (to) => {
    if (!isTags(to.path)) return
    const { fullPath, meta, name, params, path, query } = to
    settingStore.addTagsViewList({
      fullPath,
      meta,
      name,
      params,
      path,
      query,
      title: getTitle(to)
    })
  },
  {
    immediate: true
  }
)

watchSwitchLang(() => {
  settingStore.tagsViewList.forEach((route, index) => {
    settingStore.changeTagView({
      index,
      tag: {
        ...route,
        title: getTitle(route)
      }
    })
  })
})
</script>
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
