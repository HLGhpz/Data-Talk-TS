/*
 * @Author: HLGhpz
 * @Date: 2022-05-08 15:27:29
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-06-04 00:37:21
 * @Description:
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
 */

import { Chart } from '@antv/g2'
import { useChartDataStore } from '@/stores'
import { storeToRefs } from 'pinia'
import inserCss from 'insert-css'

import moment from 'moment'
moment.locale('zh-cn')

// 图表变量
let chart: any = null
const padd = {
  left: 200,
  right: 400,
  top: 100,
  bottom: 100
}
const labelColor = '#5e4b7e'
const dateColor = '#ed556a'
const defaultColor = '#ff1744'

// 全局变量
const chartDataStore = useChartDataStore()
const { latestData } = storeToRefs(chartDataStore)

inserCss(`
  .annotation {
    position: fixed;
    height: 100%;
    width: 100%;
    z-index: 9999;
  }

  .annotation-text {
    position: fixed;
    font-size: 30px;
    color: ${defaultColor};
    z-index: 9999;
  }
`)

/**
 * @description:初始化图表
 * @param {*} option
 * @return {*}
 */
function initChart(chartDom: HTMLDivElement) {
  chart = new Chart({
    container: chartDom as unknown as HTMLDivElement,
    autoFit: true,
    padding: [padd.top, padd.right, padd.bottom, padd.left]
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
        fontSize: 25,
        fontWeight: 'bold',
        fill: dateColor
      },
      offset: 30
    },
    line: null,
    tickLine: null,
    grid: null
  })

  chart.axis('range', {
    label: {
      style: {
        fontSize: 25,
        fontWeight: 'bold',
        fill: labelColor
      },
      offset: 30
    },
    line: null,
    tickLine: null,
    grid: null
  })

  // 设置图表
  chart
    .schema()
    .position('Date*range')
    .color('trend', (val) => {
      if (val === 'up') {
        return '#ff4864'
      }

      if (val === 'down') {
        return '#2fe154'
      }
    })
    .size(10)
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
  let html: any

  const annotation = document.getElementById('annotation')

  // 设置辅助标注
  html = `
<p class="annotation-text" style="bottom: 100px; right: 50px";>  时间：${
    latestData.value.Date
  }</br>
俄乌冲突天数：${latestData.value.day}</br>
开盘汇率：${latestData.value.Open.toFixed(2)}</br>
收盘汇率：${latestData.value.Close.toFixed(2)}</br>
最高汇率：${latestData.value.High.toFixed(2)}</br>
最低汇率：${latestData.value.Low.toFixed(2)}</p>
`
  annotation.innerHTML = html

  // 数据配置
  chart.changeData(chartDataStore.zeroToEndData)
}

export { initChart, updateChart }
