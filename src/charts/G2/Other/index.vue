<!--
 * @Author: HLGhpz
 * @Date: 2022-05-06 20:41:55
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-07-28 16:41:16
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
const fileName = '6月-全国县级房价排行榜'

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
  background-image: url(@/assets/img/House2.png);
}
</style>
