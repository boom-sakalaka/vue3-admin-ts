<!--
 * @Author: GZH
 * @Date: 2021-12-29 11:37:17
 * @LastEditors: GZH
 * @LastEditTime: 2022-01-28 17:04:09
 * @FilePath: \vue3-admin-ts\src\views\Login\index.vue
 * @Description: 登录页
-->
<template>
  <div class="login-container">
    <el-form class="login-from" :model="loginForm" :rules="loginRules" ref="loginFormRef">
      <div class="title-container">
        <h3 class="title">{{ $t('msg.login.title') }}</h3>
        <lang-select effect="light" class="lang-select" />
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
      >
        {{ $t('msg.login.loginBtn') }}
      </el-button>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/piniaStore/user'
import { validatePassword, validateUsername, callBcak } from './rules'
import type { ElForm } from 'element-plus'
import LangSelect from '@/components/langSelect/index.vue'
import type { IloginRules, IloginForm } from './loginType'

// 验证规则
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
// 数据源
const loginForm = ref<IloginForm>({
  username: 'super-admin',
  password: '123456'
})

// 处理密码框文本显示
const passwordType = ref<'password' | 'text'>('password')
const onChangePwdType = (): void => {
  passwordType.value = passwordType.value === 'password' ? 'text' : 'password'
}

// 处理登录逻辑
const loading = ref<boolean>(false)
type ElFormInstance = InstanceType<typeof ElForm>
const loginFormRef = ref<ElFormInstance>()
const userStore = useUserStore()
const handlerLogin = (): void => {
  // test

  // 1.进行表单校验
  loginFormRef.value?.validate((valid) => {
    if (!valid) return
    loading.value = true
    // 2.登录校验
    userStore
      .login(loginForm.value)
      .then(() => {
        // 3.进行登录后的处理
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
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
