<!--
 * @Author: HLGhpz
 * @Date: 2022-04-19 19:52:02
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-04-20 22:05:37
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
import { getData } from '@/api/request'
import * as echarts from 'echarts'
import { EChartsOption } from 'echarts'
import { ref, watch, onMounted, onBeforeMount } from 'vue'
import { useStatuStore } from '@/stores'
import { storeToRefs } from 'pinia'

const dataPath = './api/data'
const fileName = 'CNY_JPY'
const statuStore = useStatuStore()
let { showChart } = storeToRefs(statuStore)

let chartDom = ref(null)
let chartHeight = ref(0)
let chart: any = null
let startIndex = ref(0)
let chartInterval: any = null
let chartData = [] as any[]

/**
 * @description:图表的初始化设置
 * @param {*} option
 * @return {*}
 */
function initChart() {
  chartHeight.value = window.innerHeight
  chart = echarts.init(chartDom.value)
  const initOption: EChartsOption = {
    xAxis: {
      type: 'category',
      min: 'dataMin',
      max: 'dataMax',
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        margin: 10
      }
    },
    yAxis: {
      scale: true,
      splitLine: {
        show: false
      },
      axisLabel: {
        margin: 20
      }
    },
    series: [
      {
        type: 'candlestick'
      }
    ]
  }
  chart.setOption(initOption)
}

/**
 * @description:屏幕自适应
 * @param {*}
 * @return {*}
 */
function screenAdapter() {
  chartHeight.value = window.innerHeight
  let titleFontSize = (window.innerHeight / 100) * 3.6
  let scaleSize = 0.6
  const adapterOption: EChartsOption = {
    title: {
      textStyle: {
        fontSize: titleFontSize
      }
    },
    xAxis: {
      axisLabel: {
        fontSize: titleFontSize * scaleSize
      }
    },
    yAxis: {
      axisLabel: {
        fontSize: titleFontSize * scaleSize
      }
    }
  }
  chart.resize()
  chart.setOption(adapterOption)
}

// 更新数据
watch(startIndex, (newValue, oldValue) => {
  let showData = []
  if (newValue < 20) {
    showData = chartData.slice(0, newValue)
  } else if (newValue >= 20 && newValue <= chartData.length - 20) {
    showData = chartData.slice(newValue - 20, newValue)
  } else {
    showData = chartData.slice(chartData.length - 20, chartData.length)
    showChart.value = false
  }

  const dataOption: EChartsOption = {
    dataset: {
      source: showData
    },
    series: [
      {
        encode: {
          x: 0,
          y: [1, 2, 3, 4]
        }
      }
    ]
  }
  chart.setOption(dataOption)
})

// 监听图表实现
watch(showChart, (newValue, oldValue) => {
  if (newValue) {
    chartInterval = setInterval(() => {
      startIndex.value++
    }, 100)
  } else {
    clearInterval(chartInterval)
  }
})

onBeforeMount(() => {
  chartHeight.value = window.innerHeight
})

onMounted(async () => {
  const msg = await getData(dataPath, fileName)
  chartData = msg.data.map((item: Object) => Object.values(item))
  initChart()
  screenAdapter()
  window.addEventListener('resize', screenAdapter)
})
</script>

<style scoped>
.chart-wrapper {
  width: 100%;
}
</style>
