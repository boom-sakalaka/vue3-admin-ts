/*
 * @Author: GZH
 * @Date: 2021-12-29 11:26:16
 * @LastEditors: GZH
 * @LastEditTime: 2021-12-29 13:45:45
 * @FilePath: \qrcode-proj\src\main.ts
 * @Description:
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
import '@/styles/index.scss'

// 导入 全局注册 icons 组件
import installIcons from '@/icons'

const app = createApp(App)
installElementPlus(app)
installIcons(app)
app.use(store).use(router).mount('#app')
