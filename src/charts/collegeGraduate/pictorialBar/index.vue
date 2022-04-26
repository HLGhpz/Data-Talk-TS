<!--
 * @Author: HLGhpz
 * @Date: 2022-04-21 20:44:09
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-04-26 19:43:40
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
const chartHeight = ref(window.innerHeight)

onMounted(async () => {
  initChart(chartDom.value as unknown as HTMLDivElement)
  window.addEventListener('resize', adapterChart)
  adapterChart()
})
</script>

<style scoped></style>
