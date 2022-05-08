/*
 * @Author: HLGhpz
 * @Date: 2022-05-08 15:27:29
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-05-08 15:45:00
 * @Description:
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
 */

import { EChartsOption } from 'echarts'
import { useChartDataStore } from '@/stores'
import { storeToRefs } from 'pinia'
import * as echarts from 'echarts'
import Funding from '@/assets/icons/Funding.png'

// 全局变量
const chartDataStore = useChartDataStore()
const { startToEndData, latestData } = storeToRefs(chartDataStore)

let chart: any = null


// 标签配置
const labelSetting = {

}

// 初始化配置
const initOption: EChartsOption = {
}

/**
 * @description:初始化图表
 * @param {*} option
 * @return {*}
 */
function initChart(chartDom: HTMLDivElement) {

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
          x: '2022Budget',
          y: 'School'
        }
      }
    ],
    graphic: {
      elements: [
        {
          type: 'text',
          right: 200,
          bottom: 250,
          style: {
            text: `${latestData.value.School}：${latestData.value['2022Budget']} 亿元`,
            font: 'bold 60px Microsoft YaHei',
            fill: 'rgba(100,100,100,1)'
          }
        },
        {
          type: 'text',
          right: 200,
          bottom: 100,
          style: {
            text: `排名：${latestData.value.Index}`,
            font: 'bold 60px Microsoft YaHei',
            fill: 'rgba(241,147,156,1)'
          }
        }
      ]
    }
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
  let scaleSize = 0.6
  // 屏幕自适应配置
  const adapterOption: EChartsOption = {
    title: {
      textStyle: {
        fontSize: titleFontSize,
        fontWeight: 'bold'
      }
    },
    xAxis: {
      axisLabel: {
        fontSize: titleFontSize * scaleSize,
        fontWeight: 'bold'
      }
    },
    yAxis: {
      axisLabel: {
        fontSize: titleFontSize * scaleSize,
        fontWeight: 'bold'
      }
    }
  }
  chart.setOption(adapterOption)
  chart.resize()
}

export { initChart, updateChart, adapterChart }
