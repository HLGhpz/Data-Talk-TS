<!--
 * @Author: HLGhpz
 * @Date: 2022-05-27 13:21:59
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-05-27 13:29:39
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
const fileName = 'CityGDP'

// 全局变量
const chartDataStore = useChartDataStore()
const { rowData } = storeToRefs(chartDataStore)

onMounted(async () => {
  await chartDataStore.getChartData(fileName)
  rowData.value = handleData(rowData.value)
  initChart()
})
</script>

<style scoped>
.chart-wrapper {
  background-image: url(@/assets/img/city.png);
}
</style>
