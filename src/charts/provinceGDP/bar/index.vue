<!--
 * @Author: HLGhpz
 * @Date: 2022-04-21 20:44:09
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-04-29 21:57:18
 * @Description:
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
-->

<template>
  <div class="chart-wrapper" ref="chartDom"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

import { initChart, adapterChart } from './barOps'

// 固定变量
const chartDom = ref(null)

onMounted(async () => {
  initChart(chartDom.value as unknown as HTMLDivElement)
  window.addEventListener('resize', adapterChart)
  adapterChart()
})
</script>

<style scoped></style>
