<!--
 * @Author: GZH
 * @Date: 2022-01-04 21:51:51
 * @LastEditors: GZH
 * @LastEditTime: 2022-01-04 21:56:07
 * @FilePath: \vue3-admin-ts\src\components\Guide\index.vue
 * @Description:
-->
<template>
  <div>
    <el-tooltip :content="$t('msg.navBar.guide')">
      <span id="guide-start" @click="onHandleClick"><svg-icon icon="guide"></svg-icon></span>
    </el-tooltip>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import Driver from 'driver.js'
import 'driver.js/dist/driver.min.css'
import steps from './steps'

const i18n = useI18n()
let driver: Driver | null = null
onMounted(() => {
  // eslint-disable-next-line no-new
  driver = new Driver({
    allowClose: false,
    closeBtnText: i18n.t('msg.guide.close'),
    nextBtnText: i18n.t('msg.guide.next'),
    prevBtnText: i18n.t('msg.guide.prev'),
    doneBtnText: i18n.t('msg.guide.done')
  })
})

const onHandleClick = () => {
  driver!.defineSteps(steps(i18n))
  driver!.start()
}
</script>
<style lang="scss" scoped></style>
