<!--
 * @Author: HLGhpz
 * @Date: 2022-05-06 20:41:55
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-07-18 14:24:40
 * @Description:
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
-->
<template>
  <div class="chart-wrapper" id="chartDom"></div>
  <div id="annotation"></div>
</template>

<script setup lang="ts">
import { useChartDataStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { initChart } from './ops'
import { handleData } from './handleData'
import './watchDataChange'

// 图表数据
const fileName = '中国县域统计年鉴（县市）改'

// 全局变量
const chartDataStore = useChartDataStore()
const { rowData, unit } = storeToRefs(chartDataStore)

onMounted(async () => {
  await chartDataStore.getChartData(fileName)
  let result = handleData(rowData.value)
  rowData.value = result[0]
  unit.value = result[1]
  initChart()
})
</script>

<style scoped>
.chart-wrapper {
  background-image: url(@/assets/img/辽宁.png);
}
</style>
