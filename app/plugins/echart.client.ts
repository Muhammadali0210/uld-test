import { defineNuxtPlugin } from '#app'
import VueECharts from 'vue-echarts'
import * as ECharts from 'echarts'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('VChart', VueECharts)
})
