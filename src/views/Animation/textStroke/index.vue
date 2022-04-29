<!--
 * @Author: HLGhpz
 * @Date: 2022-04-25 11:38:52
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-04-28 21:37:19
 * @Description:
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
-->

<template>
  <div ref="chartDom" class="chart-wrapper"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { initChart, adapterChart } from './textStrokeOps'

// 父组件参数
const props = defineProps(['msg'])

// 固定变量
const chartDom = ref(null)

onMounted(async () => {
  initChart(chartDom.value as unknown as HTMLDivElement)
  window.addEventListener('resize', adapterChart)
  adapterChart()
})
</script>

<style scoped></style>
