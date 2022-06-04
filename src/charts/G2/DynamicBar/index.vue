<!--
 * @Author: HLGhpz
 * @Date: 2022-05-28 20:39:35
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-06-02 20:24:53
 * @Description:
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
-->
<template>
  <div class="chart-wrapper" id="chartDom"></div>
  <div id="annotation" class="annotation"></div>
</template>

<script setup lang="ts">
import { useChartDataStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { initChart } from './ops'
import { handleData, handleInitData } from './handleData'
import './watchDataChange'

// 图表数据
const fileName = 'CowMilk'

// 全局变量
const chartDataStore = useChartDataStore()
const { rowData, initData, assistData } = storeToRefs(chartDataStore)

onMounted(async () => {
  await chartDataStore.getChartData(fileName)
  rowData.value = handleData(rowData.value)
  handleInitData(rowData.value)
  initData.value = handleInitData(rowData.value).initData
  console.log(initData.value)
  assistData.value = handleInitData(rowData.value).assistData
  initChart()
})
</script>

<style scoped>
.chart-wrapper {
  background-image: url(@/assets/img/milk.png);
}
</style>
