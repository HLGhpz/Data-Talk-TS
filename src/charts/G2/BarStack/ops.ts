/*
 * @Author: HLGhpz
 * @Date: 2022-05-08 15:27:29
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-06-01 19:21:19
 * @Description:
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
 */

import { Chart } from '@antv/g2'
import { useChartDataStore } from '@/stores'
import { storeToRefs } from 'pinia'
import inserCss from 'insert-css'

// 图表变量
let chart: any = null

// 全局变量
const chartDataStore = useChartDataStore()
const { latestData } = storeToRefs(chartDataStore)

inserCss(`
  .annotation {
    position: fixed;
    bottom: 150px;
    right: 60px;
    width: 500px;
    z-index: 9999;
  }

  .annotation-flag {
    height: 60px;
    width: 80px;
  }

  .annotation-text {
    font-size: 50px;
    color: #757575;
  }
`)

// const colorMap = {
//   '🏀': '#FFD49B',
//   '⚽': '#FFE4DD',
//   '🥊': '#D8C8ED',
//   '🎾': '#E0F7C5',
//   '⛳': '#13A10E',
//   '🏈': '#FFB6AD',
//   '🏎️': '#97F3C5',
//   '🥋': '#FBF095',
//   '🏏': '#CFEB8C',
//   '⚾': '#D3F4F5'
// }

/**
 * @description:初始化图表
 * @param {*} option
 * @return {*}
 */
function initChart() {
  chart = new Chart({
    container: 'chartDom',
    autoFit: true,
    padding: [100, 100, 100, 200]
  })

  // 设置图表数据
  chart.data(chartDataStore.rowData)

  // 设置图表度量
  chart.scale({
    value: {
      // max: 130,
      // min: 0
    },
    Year: {
      type: 'cat'
    }
  })

  // // 设置图表图例
  // chart.legend('Sport', {
  //   position: 'bottom',
  //   offsetY: -25,
  //   marker: {
  //     style: {
  //       fontSize: 20
  //     }
  //   },
  //   text: {
  //     style: {
  //       fontSize: 20
  //     }
  //   }
  // })

  // 设置坐标轴
  chart.coordinate().transpose()

  chart.axis('Year', {
    label: {
      style: {
        fontSize: 20,
        fill: '#424242'
      }
    },
    line: null,
    tickLine: null,
    grid: null
  })

  chart.axis('value', {
    label: null,
    line: null,
    tickLine: null,
    grid: null
  })

  // 设置图表
  chart
    .interval()
    .position('Year*value')
    .style({
      radius: [20, 20, 0, 0]
    })
    .size(20)
    .color('type')
    .label(
      'value',
      (val: string) => {
        return {
          content: `${val}`
        }
      },
      {
        style: {
          fill: '#424242',
          fontSize: 22
        }
      }
    )

  chart.render()
}

/**
 * @description:图表的数据更新
 * @param {*} option
 * @return {*}
 */
function updateChart() {
  // 清除辅助标注

  // const annotation = document.getElementById('annotation')
  // const annotationData = latestData.value
  // annotation.innerHTML = `
  // <div class="annotation">
  // <p class="annotation-text">${annotationData.Sport}</p>
  // <p class="annotation-flag fi fi-${annotationData.Country.toLowerCase()}"></p>
  // <P class="annotation-text">${annotationData.Athlete}</P>
  // <P class="annotation-text">代言：$${annotationData.Endorsements}M</P>
  // <P class="annotation-text">薪酬：$${annotationData.Salary}M</P>
  // <P class="annotation-text">排名：${annotationData.Rank}</P>
  // </div>
  // `

  // 数据配置
  chart.changeData(chartDataStore.startToEndData)
}

export { initChart, updateChart }
