<!--
 * @Author: GZH
 * @Date: 2022-01-02 19:33:31
 * @LastEditors: GZH
 * @LastEditTime: 2022-01-03 14:30:18
 * @FilePath: \vue3-admin-ts\src\components\Breadcrumb\index.vue
 * @Description: 面包屑导航
-->
<template>
  <el-breadcrumb class="breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in breadcrumData" :key="item.path">
        <!-- 不可点击项目 -->
        <span v-if="index === breadcrumData.length - 1" class="no-redirect">
          {{ generateTitle(item.meta!.title!) }}
        </span>
        <!-- 可点击项 -->
        <span v-else class="redirect" @click="onLinkClick(item)">
          {{ generateTitle(item.meta!.title!) }}
        </span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter, RouteRecordRaw } from 'vue-router'
import { useSettingStore } from '@/piniaStore/setting'
import { generateTitle } from '@/utils/i18n'

// 生成数组数据
const breadcrumData = ref<RouteRecordRaw[]>([])
const getBreadcrumData = () => {
  // 当前路由的标准化路由记录
  breadcrumData.value = route.matched.filter((item) => item.meta && item.meta.title)
}

// 监听路由变化
const route = useRoute()
watch(
  route,
  () => {
    getBreadcrumData()
  },
  {
    immediate: true
  }
)

/* 路由点击 */
const router = useRouter()
const onLinkClick = (item: RouteRecordRaw) => {
  const { path } = item
  router.push(path)
}

// 将来需要主题替换，所以hover的颜色我们设置为主色
const settingStore = useSettingStore()
const linkHoverColor = ref<string>(settingStore.cssVar.menuBg)
</script>

<style lang="scss" scoped>
.breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  :deep(.no-redirect) {
    color: #97a8be;
    cursor: text;
  }
  .redirect {
    color: #666;
    font-weight: 600;
  }
  .redirect:hover {
    color: v-bind(linkHoverColor);
  }
}
</style>
