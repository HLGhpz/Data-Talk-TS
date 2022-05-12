/*
 * @Author: HLGhpz
 * @Date: 2022-05-08 15:27:29
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-05-10 23:12:54
 * @Description:
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
 */

import { Chart } from '@antv/g2'
import { useChartDataStore } from '@/stores'
import { storeToRefs } from 'pinia'

// 图表变量
let chart: any = null

// 全局变量
const chartDataStore = useChartDataStore()
const { latestData } = storeToRefs(chartDataStore)

/**
 * @description:初始化图表
 * @param {*} option
 * @return {*}
 */
function initChart(chartDom: HTMLDivElement) {
  chart = new Chart({
    container: chartDom as unknown as HTMLDivElement,
    autoFit: true,
    padding: [100, 200, 100, 200]
  })

  // 设置图表数据
  chart.data(chartDataStore.rowData)

  console.log(chartDataStore.rowData)

  // 设置图表度量
  chart.scale({
    DefenseSpend: {
      max: 8000,
      min: 0
    }
  })

  // 设置图表图例
  chart.legend(false)

  // 设置坐标轴
  chart.coordinate().transpose()

  chart.axis('Country', {
    label: {
      style: {
        fontSize: 18,
        fill: '#000'
      }
    },
    line: null,
    tickLine: null,
    grid: null
  })

  chart.axis('DefenseSpend', {
    label: null,
    line: null,
    tickLine: null,
    grid: null
  })

  // 设置图表
  chart
    .interval()
    .position('Country*DefenseSpend')
    .size(26)
    .color('Country')
    .label('DefenseSpend', {
      style: {
        fill: '#000'
      }
    })

  chart.render()
}

/**
 * @description:图表的数据更新
 * @param {*} option
 * @return {*}
 */
function updateChart() {
  // 清除辅助标注
  chart.annotation().clear(true)

  // 设置辅助标注
  chart.annotation().text({
    position: ['50%', '85%'],
    content: `${latestData.value.Country}：${latestData.value.DefenseSpend}＄`,
    style: {
      fontSize: 50,
      fill: '#8b8b8b'
    }
  })

  // 数据配置
  chart.changeData(chartDataStore.startToEndData)
}

export { initChart, updateChart }
