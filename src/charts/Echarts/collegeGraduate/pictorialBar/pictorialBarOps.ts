/*
 * @Author: HLGhpz
 * @Date: 2022-04-23 18:27:15
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-04-26 19:44:07
 * @Description:
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
 */

import { EChartsOption } from 'echarts'
import { useChartDataStore } from '@/stores'
import { storeToRefs } from 'pinia'
import * as echarts from 'echarts'

// 全局变量
const chartDataStore = useChartDataStore()
const { startToEndData } = storeToRefs(chartDataStore)

let chart: any = null

// 柱状图图标
const pathSymbols = {
  CollegeStudent: 'image://../../../src/assets/icons/CollegeStudent.png',
  PostGraduateStudent:
    'image://../../../src/assets/icons/PostGraduateStudent.png'
}

// 标签配置
const labelSetting = {
  show: true,
  position: 'right',
  offset: [10, 0],
  fontSize: 20
}

// 初始化配置
const initOption: EChartsOption = {
  xAxis: {
    max: 1200,
    splitLine: { show: false },
    axisLabel: { show: false },
    axisTick: { show: false },
    axisLine: { show: false }
  },
  yAxis: {
    type: 'category',
    // inverse: true,
    splitLine: { show: false },
    axisTick: { show: false },
    axisLine: { show: false },
    axisLabel: {
      margin: 30
    }
  },
  series: [
    {
      name: '应届毕业人数',
      type: 'pictorialBar',
      label: labelSetting as any,
      symbol: pathSymbols.CollegeStudent,
      symbolRepeat: true,
      symbolSize: [40, 40],
      barWidth: 40
    },
    {
      name: '考研人数',
      type: 'pictorialBar',
      label: labelSetting as any,
      symbol: pathSymbols.PostGraduateStudent,
      symbolRepeat: true,
      symbolSize: [40, 40],
      barWidth: 40,
      barGap: '8%',
      barCategoryGap: '100%'
    }
  ]
}

/**
 * @description:初始化图表
 * @param {*} option
 * @return {*}
 */
function initChart(chartDom: HTMLDivElement) {
  chart = echarts.init(chartDom)
  chart.setOption(initOption)
}

/**
 * @description:图表的数据更新
 * @param {*} option
 * @return {*}
 */
function updateChart() {
  // 数据配置
  const dataOption: EChartsOption = {
    dataset: {
      source: startToEndData.value
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
}

/**
 * @description:屏幕自适应
 * @param {*}
 * @return {*}
 */
function adapterChart() {
  let winHeight = window.innerHeight
  let titleFontSize = (winHeight / 100) * 3.6
  let scaleSize = 1
  // 屏幕自适应配置
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
  chart.setOption(adapterOption)
  chart.resize()
}

export { initChart, updateChart, adapterChart }
