/*
 * @Author: GZH
 * @Date: 2021-12-29 11:26:16
 * @LastEditors: GZH
 * @LastEditTime: 2021-12-29 11:40:18
 * @FilePath: \qrcode-proj\src\main.ts
 * @Description:
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
import '@/styles/index.scss'

const app = createApp(App)
installElementPlus(app)
app.use(store).use(router).mount('#app')
