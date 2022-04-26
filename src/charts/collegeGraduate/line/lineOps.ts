/*
 * @Author: HLGhpz
 * @Date: 2022-04-23 18:27:15
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-04-24 14:45:00
 * @Description:
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
 */

import { EChartsOption } from 'echarts'
import { useChartDataStore, useChartStore } from '@/stores'
import { storeToRefs } from 'pinia'
import * as echarts from 'echarts'

// 全局变量
const chartDataStore = useChartDataStore()
const chartStore = useChartStore()
const { zeroToEndData } = storeToRefs(chartDataStore)
const { winHeight } = storeToRefs(chartStore)

let chart: any = null

// 初始化配置
const initOption: EChartsOption = {
  xAxis: {
    type: 'category',
    splitLine: { show: false },
    axisTick: { show: false },
    axisLine: { show: false }
  },
  yAxis: {
    type: 'value',
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
      name: '考研人数',
      type: 'line',
      smooth: true,
      stack: 'tiled',
      lineStyle: {
        width: 0
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(0, 221, 255)'
          },
          {
            offset: 1,
            color: 'rgb(77, 119, 255)'
          }
        ])
      }
    },
    {
      name: '应届毕业人数',
      type: 'line',
      smooth: true,
      stack: 'tiled',
      lineStyle: {
        width: 0
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(255, 0, 135)'
          },
          {
            offset: 1,
            color: 'rgb(135, 0, 157)'
          }
        ])
      }
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
      source: zeroToEndData.value
    },
    series: [
      {
        encode: {
          x: 0,
          y: 2
        }
      },
      {
        encode: {
          x: 0,
          y: 1
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
  winHeight.value = window.innerHeight
  let titleFontSize = (winHeight.value / 100) * 3.6
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
