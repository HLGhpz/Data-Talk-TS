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
const fileName = 'DefenseSpend'

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
  background-image: url(@/assets/img/backGround-red.png);
}
</style>
