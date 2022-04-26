/*
 * @Author: HLGhpz
 * @Date: 2022-04-23 18:27:15
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-04-24 19:58:55
 * @Description:
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
 */

import { EChartsOption } from 'echarts'
import { useChartDataStore, useChartStore } from '@/stores'
import { storeToRefs } from 'pinia'
import * as echarts from 'echarts'

// 引入图标
import CollegeStudent from '@/assets/icons/CollegeStudent.png'
import PostGraduateStudent from '@/assets/icons/PostGraduateStudent.png'

// 全局变量
const chartDataStore = useChartDataStore()
const chartStore = useChartStore()
const { startToEndData, zeroToEndData } = storeToRefs(chartDataStore)
const { winHeight } = storeToRefs(chartStore)

let chart: any = null

// 柱状图图标
const pathSymbols = {
  CollegeStudent: `image://${CollegeStudent}`,
  PostGraduateStudent: `image://${PostGraduateStudent}`
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
  grid: [
    {
      bottom: '20%'
    },
    {
      top: '80%'
    }
  ],
  xAxis: [
    {
      gridIndex: 0,
      max: 1200,
      splitLine: { show: false },
      axisLabel: { show: false },
      axisTick: { show: false },
      axisLine: { show: false }
    },
    {
      gridIndex: 1,
      type: 'category',
      splitLine: { show: false },
      axisTick: { show: false },
      axisLine: { show: false }
    }
  ],
  yAxis: [
    {
      gridIndex: 0,
      type: 'category',
      // inverse: true,
      splitLine: { show: false },
      axisTick: { show: false },
      axisLine: { show: false },
      axisLabel: {
        margin: 30
      }
    },
    {
      gridIndex: 1,
      type: 'value',
      // inverse: true,
      splitLine: { show: false },
      axisTick: { show: false },
      axisLine: { show: false },
      axisLabel: { show: false }
    }
  ],
  series: [
    {
      name: '应届毕业人数',
      type: 'pictorialBar',
      xAxisIndex: 0,
      yAxisIndex: 0,
      label: labelSetting as any,
      symbol: pathSymbols.CollegeStudent,
      symbolRepeat: true,
      symbolSize: [40, 40],
      barWidth: 40
    },
    {
      name: '考研人数',
      type: 'pictorialBar',
      xAxisIndex: 0,
      yAxisIndex: 0,
      label: labelSetting as any,
      symbol: pathSymbols.PostGraduateStudent,
      symbolRepeat: true,
      symbolSize: [40, 40],
      barWidth: 40,
      barGap: '8%',
      barCategoryGap: '100%'
    },
    {
      name: '考研人数',
      type: 'line',
      xAxisIndex: 1,
      yAxisIndex: 1,
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
      xAxisIndex: 1,
      yAxisIndex: 1,
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
    dataset: [
      {
        source: startToEndData.value
      },
      {
        source: zeroToEndData.value
      }
    ],
    series: [
      {
        datasetIndex: 0,
        encode: {
          x: 1,
          y: 0
        }
      },
      {
        datasetIndex: 0,
        encode: {
          x: 2,
          y: 0
        }
      },
      {
        datasetIndex: 1,
        encode: {
          x: 0,
          y: 2
        }
      },
      {
        datasetIndex: 1,
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
    xAxis: [
      {
        // axisLabel: {
        //   fontSize: titleFontSize * scaleSize
        // }
      },
      {
        axisLabel: {
          fontSize: titleFontSize * scaleSize
        }
      }
    ],
    yAxis: [
      {
        axisLabel: {
          fontSize: titleFontSize * scaleSize
        }
      },
      {
        // axisLabel: {
        //   fontSize: titleFontSize * scaleSize
        // }
      }
    ]
  }
  chart.setOption(adapterOption)
  chart.resize()
}

export { initChart, updateChart, adapterChart }
