<!--
 * @Author: HLGhpz
 * @Date: 2022-04-25 11:38:52
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-04-28 16:29:18
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
  background-image: url(@/assets/img/backGround-pink.png);
}
</style>
