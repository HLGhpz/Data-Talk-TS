/*
 * @Author: HLGhpz
 * @Date: 2022-04-23 18:27:15
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-04-28 21:04:26
 * @Description:
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
 */

import { EChartsOption } from 'echarts'
import { useChartDataStore } from '@/stores'
import { storeToRefs } from 'pinia'
import * as echarts from 'echarts'

// 引入图标
import { CollegeStudent, PostGraduateStudent } from '@/assets/icons'

// 全局变量
const chartDataStore = useChartDataStore()
const { startToEndData, zeroToEndData } = storeToRefs(chartDataStore)

let chart: any = null

// 柱状图图标
const pathSymbols = {
  CollegeStudent: `image://${CollegeStudent}`,
  PostGraduateStudent: `image://${PostGraduateStudent}`
}

// 标签配置
const GraduateLabelSetting = {
  show: true,
  position: 'right',
  fontSize: 22,
  color: '#0072FF',
  formatter: (params: any) => {
    return `   应届毕业生人数：${params.data['Graduate']} 万`
  }
}

const KaoYanLabelSetting = {
  show: true,
  position: 'right',
  fontSize: 22,
  color: '#000',
  formatter: (params: any) => {
    return `   考研人数：${params.data['KaoYan']} 万`
  }
}

// 初始化配置
const initOption: EChartsOption = {
  grid: [
    {
      top: '13%',
      bottom: '15%'
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
      label: GraduateLabelSetting as any,
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
      label: KaoYanLabelSetting as any,
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
            color: 'rgba(0, 221, 255, 0.5)'
          },
          {
            offset: 1,
            color: 'rgba(77, 119, 255, 0.5)'
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
          x: 'Graduate',
          y: 'Year'
        }
      },
      {
        datasetIndex: 0,
        encode: {
          x: 'KaoYan',
          y: 'Year'
        }
      },
      {
        datasetIndex: 1,
        encode: {
          x: 'Year',
          y: 'KaoYan'
        }
      },
      {
        datasetIndex: 1,
        encode: {
          x: 'Year',
          y: 'Graduate'
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
    xAxis: [
      {},
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
