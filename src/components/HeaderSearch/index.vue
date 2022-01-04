<!--
 * @Author: GZH
 * @Date: 2022-01-04 10:11:24
 * @LastEditors: GZH
 * @LastEditTime: 2022-01-04 10:49:16
 * @FilePath: \vue3-admin-ts\src\components\HeaderSearch\index.vue
 * @Description: 头部搜索组件
-->
<template>
  <div class="header-search" :class="{ show: isShow }">
    <span @click.stop="onShowClick">
      <svg-icon className="search-icon" icon="search"></svg-icon>
    </span>

    <el-select
      ref="headerSearchSelectRef"
      class="header-search-select"
      v-model="search"
      filterable
      default-first-option
      remote
      :remote-method="querySearch"
      placeholder="search"
      @change="onSelectChange"
    >
      <el-option
        v-for="option in searchObj"
        :key="option.item!.path"
        :label="option.item!.title.join('>')"
        :value="option.item"
      ></el-option>
    </el-select>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { filterRoutes } from '@/utils/route'
import Fuse from 'fuse.js'
import { generateRoutes, IRouter } from './FuseData'
import { watchSwitchLang } from '@/utils/i18n'

// 获取数据源
const router = useRouter()
let searchPool = computed(() => {
  const filterRoute = filterRoutes(router.getRoutes())
  return generateRoutes(filterRoute)
})

let fuse: Fuse<IRouter>
const initFuse = (searchPool: IRouter[]) => {
  fuse = new Fuse(searchPool, {
    // 是否按照优先级进行排序
    shouldSort: true,
    // 匹配长度超过这个值的才会被认为是匹配
    minMatchCharLength: 1,
    // 将被 搜素的 键列表，这支持 嵌套路劲 鉴权搜索 在字符串和对象数组中搜索
    // name: 搜索的值
    // weight: 对应的权重
    keys: [
      {
        name: 'title',
        weight: 0.7
      },
      {
        name: 'path',
        weight: 0.3
      }
    ]
  })
}

initFuse(searchPool.value)

// 控制search 输入框显示
const isShow = ref<boolean>(false)
const onShowClick = () => {
  isShow.value = !isShow.value
}

/* search相关 */
const search = ref<string>('')
const searchObj = ref<IRouter[]>([])

/* 搜索方法 */
const querySearch = (query: string) => {
  if (query !== '') {
    searchObj.value = fuse.search(query) as unknown as IRouter[]
  } else {
    searchObj.value = []
  }
}

// 选中回调
const onSelectChange = (val: IRouter) => {
  router.push(val.path)
}

const headerSearchSelectRef = ref()
const onClose = () => {
  headerSearchSelectRef.value.blur()
  isShow.value = false
  searchObj.value = []
}

watch(isShow, (val) => {
  if (val) {
    document.body.addEventListener('click', onClose)
  } else {
    document.body.removeEventListener('click', onClose)
  }
})

watchSwitchLang(() => {
  searchPool = computed(() => {
    const filterRoute = filterRoutes(router.getRoutes())
    // console.log(filterRoute)
    return generateRoutes(filterRoute)
  })
  initFuse(searchPool.value)
})
</script>
<style lang="scss" scoped>
.header-search {
  font-size: 0 !important;
  :deep(.search-icon) {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
  }
  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;

    :deep(.el-input__inner) {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
    }
  }
  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>
