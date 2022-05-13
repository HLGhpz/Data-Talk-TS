/*
 * @Author: HLGhpz
 * @Date: 2022-05-08 15:27:29
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-05-13 21:45:07
 * @Description:
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
 */

import { Chart } from '@antv/g2'
import { useChartDataStore } from '@/stores'
import { storeToRefs } from 'pinia'
import inserCss from 'insert-css'

import moment from 'moment'
import dayjs from 'dayjs'
moment.locale('zh-cn')

// 图表变量
let chart: any = null

// 全局变量
const chartDataStore = useChartDataStore()
const { latestData } = storeToRefs(chartDataStore)

inserCss(`
  .annotation {
    position: fixed;
    top: 50px;
    right: 50px;
    width: 400px;
    z-index: 9999;
  }

  .annotation-text {
    font-size: 30px;
    color: #757575;
  }
`)

/**
 * @description:初始化图表
 * @param {*} option
 * @return {*}
 */
function initChart() {
  chart = new Chart({
    container: 'chartDom',
    autoFit: true,
    padding: [100, 100, 100, 100]
  })

  // 设置图表数据
  chart.data(chartDataStore.rowData)

  // 设置图表度量
  chart.scale({
    Date: {
      type: 'timeCat',
      formatter: (date) => {
        return dayjs(date).format('DD日 HH:mm')
      },
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
      // formatter: (val) => {
      //   console.log('val', val)
      //   return dayjs(val).format('DD日 HH:mm')
      // },
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
  // 设置辅助标注
  const annotation = document.getElementById('annotation')
  const annotationData = latestData.value
  annotation.innerHTML = `
  <div class="annotation">
  <P class="annotation-text">Date：${dayjs(annotationData.Date).format(
    'DD日 HH:mm'
  )}<br/>Open：${annotationData.Open.toFixed(5)} ＄
  <br/>High：${annotationData.High.toFixed(5)} ＄
  <br/>Low：${annotationData.Low.toFixed(5)} ＄
  <br/>Close：${annotationData.Close.toFixed(5)} ＄</P>
  </div>
  `

  // 数据配置
  chart.changeData(chartDataStore.zeroToEndData)
}

export { initChart, updateChart }
