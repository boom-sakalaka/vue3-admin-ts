<!--
 * @Author: GZH
 * @Date: 2022-01-01 22:22:16
 * @LastEditors: GZH
 * @LastEditTime: 2022-01-02 19:39:27
 * @FilePath: \vue3-admin-ts\src\layout\components\Navbar.vue
 * @Description:
-->
<template>
  <div class="navbar">
    <!-- 汉堡 -->
    <hamburger class="hambruger-container" id="guide-hamburger" />
    <!-- 面包屑导航 -->
    <breadcrumb class="breadcrumb-container" id="guide-breadcrumb" />
    <div class="right-menu">
      <!-- 头像 -->
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <el-avatar shape="square" :size="40" :src="userStore.userInfo.avatar + '1'"></el-avatar>
          <i class="el-icon-s-tools"></i>
        </div>
        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <router-link to="/">
              <el-dropdown-item>首页</el-dropdown-item>
            </router-link>
            <a href="#" target="_blank">
              <el-dropdown-item>主页</el-dropdown-item>
            </a>
            <el-dropdown-item divided @click="logout"> 退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/piniaStore/user'
import Hamburger from '@/components/hamburger/index.vue'
import Breadcrumb from '@/components/Breadcrumb/index.vue'

const userStore = useUserStore()
// 退出登录
const logout = () => {
  userStore.logout()
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .hambruger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    // hover 动画
    transition: background 0.5s;

    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }
  .breadcrumb-container {
    float: left;
  }
  .right-menu {
    display: flex;
    align-items: center;
    float: right;
    padding-right: 16px;

    :deep(.right-menu-item) {
      display: inline-block;
      padding: 0 18px 0 0;
      font-size: 24px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
      }
    }
    :deep(.avatar-container) {
      cursor: pointer;
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        :deep(.el-avatar) {
          --el-avatar-background-color: none;
          margin-right: 12px;
        }
      }
    }
  }
}
</style>
