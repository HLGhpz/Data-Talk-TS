<!--
 * @Author: HLGhpz
 * @Date: 2022-05-06 20:41:55
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-05-13 20:38:40
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
import { ref, onMounted } from 'vue'
import { initChart } from './ops'
import { handleData } from './handleData'
import './watchDataChange'

// 图表数据
const fileName = 'Luna'

// 图表变量
const chartDom = ref(null)

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
  background-image: url(@/assets/img/backGround-cyan.png);
}
</style>
