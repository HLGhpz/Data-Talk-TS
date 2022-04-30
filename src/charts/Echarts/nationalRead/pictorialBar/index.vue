<!--
 * @Author: HLGhpz
 * @Date: 2022-04-29 11:18:04
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-04-29 16:55:05
 * @Description:
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
-->

<template>
  <div class="chart-wrapper" ref="chartDom"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { initChart, adapterChart } from './pictorialBarOps'

// 固定变量
const chartDom = ref(null)

onMounted(async () => {
  initChart(chartDom.value as unknown as HTMLDivElement)
  window.addEventListener('resize', adapterChart)
  adapterChart()
})
</script>

<style scoped>
.chart-wrapper {
  background-image: url(@/assets/img/backGround-orange.png);
}
</style>
