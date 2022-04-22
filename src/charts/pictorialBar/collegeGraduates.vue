<!--
 * @Author: HLGhpz
 * @Date: 2022-04-21 20:44:09
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-04-22 13:40:32
 * @Description:
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
-->

<template>
  <div class="chart-wrapper" ref="chartDom"></div>
</template>

<script setup lang="ts">
import { getData } from '@/api/request'
import * as echarts from 'echarts'
import { EChartsOption } from 'echarts'
import { ref, watch, onMounted, onBeforeMount } from 'vue'
import { useStateStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { useDebounceFn } from '@vueuse/core'

// 特有变量
const pathSymbols = {
  CollegeStudent: 'image://../../src/assets/icons/CollegeStudent.png',
  PostGraduateStudent: 'image://../../src/assets/icons/PostGraduateStudent.png'
}

// 图表数据
const dataPath = './api/data'
const fileName = 'College_Graduates'

// 全局变量
const stateStore = useStateStore()
let { showChart } = storeToRefs(stateStore)

// 固定变量
let chartDom = ref(null)
let chart: any = null
let startIndex = ref(0)
let chartInterval: any = null
let chartData = [] as any[]
let showLength = 10 // 显示的数据长度
let topBorder = 43 // 顶端高度
let chartSizeOpts = ref({
  height: window.innerHeight - topBorder
})

/**
 * @description:图表的初始化设置
 * @param {*} option
 * @return {*}
 */
function initChart() {
  chartSizeOpts.value = {
    height: window.innerHeight - topBorder
  }
  chart = echarts.init(
    chartDom.value as unknown as HTMLDivElement,
    chartSizeOpts.value
  )
  chart.height = window.innerHeight - topBorder
  const labelSetting = {
    show: true,
    position: 'right',
    offset: [10, 0],
    fontSize: 20
  }
  const initOption: EChartsOption = {
    xAxis: {
      max: 'dataMax',
      splitLine: { show: false },
      axisLabel: { show: false },
      axisTick: { show: false },
      axisLine: { show: false }
    },
    yAxis: {
      inverse: true,
      splitLine: { show: false },
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        margin: 30
      }
    },
    series: [
      {
        name: '应届毕业人数',
        type: 'pictorialBar',
        label: labelSetting,
        symbol: pathSymbols.CollegeStudent,
        symbolRepeat: true,
        symbolSize: [40, 40],
        barWidth: 40
      },
      {
        name: '考研人数',
        type: 'pictorialBar',
        label: labelSetting,
        symbol: pathSymbols.PostGraduateStudent,
        symbolRepeat: true,
        symbolSize: [40, 40],
        barWidth: 40,
        barGap: '8%',
        barCategoryGap: '100%'
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
  chartSizeOpts.value = {
    height: window.innerHeight - topBorder
  }
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
      type: 'category',
      axisLabel: {
        fontSize: titleFontSize * scaleSize
      }
    }
  }
  chart.setOption(adapterOption)
  chart.resize(chartSizeOpts.value)
}

// 函数防抖
const adaptDebounce = useDebounceFn(screenAdapter, 1000)

// 更新数据
watch(startIndex, (newValue) => {
  let showData = []
  if (newValue < showLength) {
    showData = chartData.slice(0, newValue)
  } else if (newValue >= showLength && newValue <= chartData.length) {
    showData = chartData.slice(newValue - showLength, newValue)
  } else {
    showData = chartData.slice(chartData.length - showLength, chartData.length)
    showChart.value = false
  }

  const dataOption: EChartsOption = {
    dataset: {
      source: showData
    },
    series: [
      {
        encode: {
          x: 1,
          y: 0
        }
      },
      {
        encode: {
          x: 2,
          y: 0
        }
      }
    ]
  }
  chart.setOption(dataOption)
})

// 监听图表实现
watch(showChart, (newValue) => {
  if (newValue) {
    chartInterval = setInterval(() => {
      startIndex.value++
    }, 1000)
  } else {
    clearInterval(chartInterval)
  }
})

onBeforeMount(() => {})

onMounted(async () => {
  const msg = await getData(dataPath, fileName)
  chartData = msg.data
  initChart()
  window.addEventListener('resize', adaptDebounce)
  screenAdapter()
})
</script>

<style scoped>
.chart-wrapper {
  width: 100%;
}
</style>
