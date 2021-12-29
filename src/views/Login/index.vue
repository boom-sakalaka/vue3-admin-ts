<!--
 * @Author: GZH
 * @Date: 2021-12-29 11:37:17
 * @LastEditors: GZH
 * @LastEditTime: 2021-12-29 14:46:53
 * @FilePath: \qrcode-proj\src\views\Login\index.vue
 * @Description: 登录页
-->
<template>
  <div class="login-container">
    <el-form class="login-from" :model="loginForm" :rules="loginRules" ref="loginFormRef">
      <div class="title-container">
        <h3 class="title">二维码管理系统</h3>
      </div>
      <!-- username -->
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon="user" />
        </span>
        <el-input
          placeholder="username"
          name="“username"
          type="text"
          v-model="loginForm.username"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon="password"></svg-icon>
        </span>
        <el-input
          placeholder="password"
          :type="passwordType"
          name="password"
          v-model="loginForm.password"
        ></el-input>
        <span class="show-pwd">
          <span class="svg-container" @click="onChangePwdType">
            <svg-icon :icon="passwordType === 'password' ? 'eye' : 'eye-open'"></svg-icon>
          </span>
        </span>
      </el-form-item>
      <el-button
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click="handlerLogin"
        :loading="loading"
        >登录</el-button
      >
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from 'vuex'
import { validatePassword, validateUsername, callBcak } from './rules'

// 类型定义
interface IloginForm {
  username: string
  password: string
}
interface IloginRules {
  username: {
    required: boolean
    trigger: string
    validator: (rule: unknown, value: string, callback: callBcak) => void
  }[]
  password: {
    required: boolean
    trigger: string
    validator: (rule: unknown, value: string, callback: callBcak) => void
  }[]
}

// 数据源
const loginForm = ref<IloginForm>({
  username: 'super-admin',
  password: '123456'
})

// 验证规则
// const i18n = useI18n()
const loginRules = ref<IloginRules>({
  username: [
    {
      required: true,
      trigger: 'blur',
      validator: validateUsername()
    }
  ],
  password: [
    {
      required: true,
      trigger: 'blur',
      validator: validatePassword()
    }
  ]
})

// 处理密码框文本显示
const passwordType = ref<'password' | 'text'>('password')
const onChangePwdType = (): void => {
  passwordType.value = passwordType.value === 'password' ? 'text' : 'password'
}

// 处理登录逻辑
const loading = ref<boolean>(false)
const store = useStore()
const loginFormRef = ref<any>(null)
const handlerLogin = (): void => {
  // 进行表单校验
  loginFormRef.value?.vaildate((valid: boolean) => {
    if (!valid) return
    loading.value = true
    store
      .dispatch('user/login', loginForm.value)
      .then(() => {
        loading.value = false
        // 3.进行登录后的处理
      })
      .catch((err) => {
        console.log(err)
        loading.value = false
      })
  })
}
</script>
<style scoped lang="scss">
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;
.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  display: flex;
  justify-content: center;
  .login-from {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    overflow: hidden;
    :deep(.el-form-item) {
      display: flex;
      align-items: center;
      border: 1px solid rgba(255, 255, 255, 0.1);
      background-color: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
      .el-form-item__content {
        display: flex;
        align-items: center;
        input {
          background: transparent;
          border: none;
          border-radius: 0px;
          padding: 12px 5px;
          color: $light_gray;
          caret-color: $cursor;
        }
      }
    }
    :deep(ex-input) {
      display: inline-block;
      height: 47px;
      width: 85%;
    }

    .tips {
      font-size: 16px;
      color: white;
      line-height: 24px;
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    display: inline-block;
  }
  .title-container {
    position: relative;
    .title {
      font-size: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
      color: #fff;
    }
    :deep(.lang-select) {
      position: absolute;
      top: 0;
      right: 0;
      font-size: 22px;
      background: #fff;
      padding: 4px;
      border-radius: 4px;
      cursor: pointer;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
