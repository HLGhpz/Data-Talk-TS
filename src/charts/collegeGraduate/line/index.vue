<!--
 * @Author: HLGhpz
 * @Date: 2022-04-21 20:44:09
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-04-24 14:33:23
 * @Description:
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
-->

<template>
  <div class="chart-wrapper" ref="chartDom"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useChartStore } from '@/stores'
import { storeToRefs } from 'pinia'

import { initChart, adapterChart } from './lineOps'

// 全局变量
const chartStore = useChartStore()
const { winHeight } = storeToRefs(chartStore)

// 固定变量
const chartDom = ref(null)

onMounted(async () => {
  console.log('line')
  winHeight.value = window.innerHeight
  initChart(chartDom.value as unknown as HTMLDivElement)
  window.addEventListener('resize', adapterChart)
  adapterChart()
})
</script>

<style scoped>
.chart-wrapper {
  width: 300px;
  height: 300px;
  position: fixed;
  right: 100px;
  bottom: 0px;
  z-index: 99999;
}
</style>
