/*
 * @Author: GZH
 * @Date: 2021-12-29 11:26:16
 * @LastEditors: GZH
 * @LastEditTime: 2022-01-01 22:00:38
 * @FilePath: \vue3-admin-ts\src\main.ts
 * @Description:
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import installElementPlus from './plugins/element'
import '@/styles/index.scss'
import createPinia from '@/piniaStore'

// 导入 全局注册 icons 组件
import installIcons from '@/icons'

// 导入路由鉴权
import './permission'

const app = createApp(App)
installElementPlus(app)
installIcons(app)
app.use(createPinia).use(router).mount('#app')
