/*
 * @Author: HLGhpz
 * @Date: 2022-05-08 15:27:29
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-05-10 22:38:38
 * @Description:
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
 */

import { Chart } from '@antv/g2'
import { useChartDataStore } from '@/stores'
import { storeToRefs } from 'pinia'

import moment from 'moment'
moment.locale('zh-cn')

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
    padding: [100, 100, 100, 100]
  })

  // 设置图表数据
  chart.data(chartDataStore.rowData)

  // 设置图表度量
  chart.scale({
    date: {
      type: 'timeCat',
      range: [0, 1],
      tickCount: 5,
      nice: true
    },
    trend: {
      values: ['up', 'down']
    },
    range: {
      alias: '卢布汇率',
      nice: true
    }
  })

  // 设置图表图例
  chart.legend({
    itemName: {
      style: {
        fontSize: 18,
        fill: '#000'
      }
    },
    offsetY: -10
  })

  // 设置坐标轴
  chart.axis('Date', {
    label: {
      formatter: (val) => {
        return moment(val, 'YYYY-MM-DD').format('MM月DD')
      },
      style: {
        fontSize: 18,
        fill: '#000'
      },
      offset: 30
    }
  })

  chart.axis('range', {
    label: {
      style: {
        fontSize: 18,
        fill: '#000'
      },
      offset: 30
    }
  })

  // 设置图表
  chart
    .schema()
    .position('Date*range')
    .color('trend', (val) => {
      if (val === 'up') {
        return '#f04864'
      }

      if (val === 'down') {
        return '#2fc25b'
      }
    })
    .size(6)
    .shape('candle')

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
    position: ['5%', '10%'],
    content: `时间：${latestData.value.Date}\n
    开盘汇率：${latestData.value.Open}\n
    收盘汇率：${latestData.value.Close}\n
    最高汇率：${latestData.value.High}\n
    最低汇率：${latestData.value.Low}`,
    style: {
      fontSize: 22,
      textAlign: 'left',
      fill: '#000'
    }
  })

  // 数据配置
  chart.changeData(chartDataStore.zeroToEndData)
}

export { initChart, updateChart }
