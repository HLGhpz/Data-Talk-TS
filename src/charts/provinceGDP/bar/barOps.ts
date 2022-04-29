/*
 * @Author: HLGhpz
 * @Date: 2022-04-23 18:27:15
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-04-29 22:28:46
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
const { startToEndData, zeroToEndData } = storeToRefs(chartDataStore)

let chart: any = null

// 标签配置
const LabelSetting2022 = {
  show: true,
  position: 'top',
  fontSize: 18,
  offset: [-15, -30],
  formatter: (params: any) => {
    return `${params.data['2022Q1GDP']} `
  }
}

const LabelSetting2021 = {
  show: true,
  position: 'top',
  fontSize: 18,
  offset: [15, 0],
  formatter: (params: any) => {
    return `${params.data['2021Q1GDP']} `
  }
}

// 初始化配置
const initOption: EChartsOption = {
  grid: {
    top: '13%',
    bottom: '15%'
  },
  xAxis: {
    type: 'category',
    splitLine: { show: false },
    axisLine: { show: false },
    // axisLabel: { show: false },
    axisTick: { show: false }
  },
  yAxis: {
    max: 30000,
    splitLine: { show: false },
    axisLine: { show: false },
    // axisLabel: { show: false },
    axisTick: { show: false }
  },
  series: [
    {
      name: '2022 Q1 GDP',
      type: 'bar',
      label: LabelSetting2022 as any,
      barWidth: 25
    },
    {
      name: '2021 Q1 GDP',
      type: 'bar',
      label: LabelSetting2021 as any,
      barWidth: 25
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
  console.log('初始化', chart.getOption())
}

/**
 * @description:图表的数据更新
 * @param {*} option
 * @return {*}
 */
function updateChart() {
  // 数据配置
  const dataOption: EChartsOption = {
    dataset: [
      {
        source: startToEndData.value
      }
    ],
    series: [
      {
        encode: {
          x: 'Province',
          y: '2022Q1GDP'
        }
      },
      {
        encode: {
          x: 'Province',
          y: '2021Q1GDP'
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
  let scaleSize = 0.5
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
