/*
 * @Author: HLGhpz
 * @Date: 2022-05-08 15:27:29
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-05-16 13:37:02
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
    padding: [100, 150, 150, 100]
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
      // range: [0, 1],
      // tickCount: 5,
      nice: true
    },
    trend: {
      values: ['up', 'down']
    },
    range: {
      alias: 'Luna',
      // min: 0,
      // max: 80,
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
  let trendHtml = ''
  if (annotationData.trend === 'up') {
    trendHtml = `<br/><p class="annotation-text" style="color:#f04864">上扬：${(
      annotationData.Close - annotationData.Open
    ).toFixed(5)}＄</p>`
  } else {
    trendHtml = `<br/><p class="annotation-text" style="color:#2fc25b">下跌：${(
      annotationData.Open - annotationData.Close
    ).toFixed(5)}＄</p>`
  }
  annotation.innerHTML = `
  <div class="annotation">
  <P class="annotation-text">${dayjs(annotationData.Date).format(
    'DD 日 HH:mm 时'
  )}
 <br/>开盘：${annotationData.Open.toFixed(5)} ＄
  <br/>高点：${annotationData.High.toFixed(5)} ＄
  <br/>低点：${annotationData.Low.toFixed(5)} ＄
  <br/>关盘：${annotationData.Close.toFixed(5)} ＄
  ${trendHtml}
  </P>
  </div>
  `

  // 数据配置
  chart.changeData(chartDataStore.zeroToEndData)
}

export { initChart, updateChart }
