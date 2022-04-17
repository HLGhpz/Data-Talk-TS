<!--
 * @Author: HLGhpz
 * @Date: 2022-04-11 20:52:01
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-04-13 15:18:17
 * @Description:
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
-->
<template>
  <div
    class="chart-wrapper"
    ref="chartDom"
    :style="{ height: `${chartHeight - 43}px` }"
  ></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { EChartsOption } from 'echarts'
import { ref, onMounted, onBeforeMount } from 'vue'

let chartDom = ref(null)
let chartHeight = ref(0)
let lineChart = null

const initOption: EChartsOption = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line'
    }
  ]
}

/**
 * @description:图表的初始化设置
 * @param {*} option
 * @return {*}
 */
function initChart(option: EChartsOption) {
  chartHeight.value = window.innerHeight
  lineChart = echarts.init(chartDom.value)
  lineChart.setOption(option)
}

/**
 * @description:屏幕自适应
 * @param {*}
 * @return {*}
 */
function screenAdapter() {
  chartHeight.value = window.innerHeight
  if (lineChart) {
    lineChart.resize()
  }
}

onBeforeMount(() => {
  chartHeight.value = window.innerHeight
})

onMounted(() => {
  initChart(initOption)
  window.addEventListener('resize', screenAdapter)
})
</script>

<style scoped>
.chart-wrapper {
  width: 100%;
}
</style>
