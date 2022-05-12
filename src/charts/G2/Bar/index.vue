<!--
 * @Author: HLGhpz
 * @Date: 2022-05-06 20:41:55
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-05-10 22:53:41
 * @Description:
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
-->
<template>
  <div class="chart-wrapper" ref="chartDom"></div>
</template>

<script setup lang="ts">
import { useChartDataStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { ref, onMounted } from 'vue'
import { initChart } from './ops'
import { handleData } from './handleData'
import './watchDataChange'

// 图表数据
const fileName = 'DefenseSpend'

// 图表变量
const chartDom = ref(null)

// 全局变量
const chartDataStore = useChartDataStore()
const { rowData } = storeToRefs(chartDataStore)

onMounted(async () => {
  await chartDataStore.getChartData(fileName)
  rowData.value = handleData(rowData.value)
  initChart(chartDom.value as unknown as HTMLDivElement)
})
</script>

<style scoped>
.chart-wrapper {
  background-image: url(@/assets/img/backGround-cyan.png);
}
</style>
