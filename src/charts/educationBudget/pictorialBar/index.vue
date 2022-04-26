<!--
 * @Author: HLGhpz
 * @Date: 2022-04-25 11:38:52
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-04-25 11:59:55
 * @Description:
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
-->

<template>
  <div
    class="chart-wrapper"
    ref="chartDom"
    :style="{ height: `${chartHeight}px` }"
  ></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useChartStore } from '@/stores'
import { storeToRefs } from 'pinia'

import { initChart, adapterChart } from './pictorialBarOps'

// 全局变量
const chartStore = useChartStore()
const { winHeight } = storeToRefs(chartStore)

// 固定变量
const chartDom = ref(null)
const chartHeight = ref(window.innerHeight)

onMounted(async () => {
  console.log('pictorialBar')
  winHeight.value = window.innerHeight
  chartHeight.value = winHeight.value
  initChart(chartDom.value as unknown as HTMLDivElement)

  window.addEventListener('resize', adapterChart)
  adapterChart()
})
</script>

<style scoped>
.chart-wrapper {
  width: 100%;
}
</style>
