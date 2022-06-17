/*
 * @Author: HLGhpz
 * @Date: 2022-05-08 15:27:29
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-06-17 22:31:00
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
const padd = {
  left: 150,
  right: 200,
  top: 100,
  bottom: 50
}
// const showDataLength = 15
const barSize = 36
const defaultColor = '#ed556a'
const labelColor = '#fff'
const yLableColor = '#11659a'

// 颜色映射
const colorMap = {
  Undergraduate: '#28afea',
  CollegeStudent: '#ee3f4d'
}

// 全局变量
const chartDataStore = useChartDataStore()

inserCss(`
  .annotation {
    position: fixed;
    height: 100%;
    width: 100%;
    z-index: 9999;
  }

  .annotation-img{
    position: fixed;
    width: 200px;
  }

  .annotation-text {
    position: fixed;
    font-size: 30px;
    font-weight: bold;
    color: ${defaultColor};
    z-index: 9999;
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
    padding: [padd.top, padd.right, padd.bottom, padd.left]
  })

  // 设置图表数据
  chart.data(chartDataStore.rowData)

  // 设置图表度量
  chart.scale({
    // Product: {
    //   nice: true
    // }
    short: {
      type: 'cat',
      formatter: (value: any) => {
        return value
      },
      tickCount: 15
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

  chart.axis('short', {
    label: {
      style: {
        fontSize: 22,
        fill: `${yLableColor}`,
        fontWeight: 'bold'
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
    .adjust('stack')
    .position('short*value')
    .size(barSize)
    .color('Category', (value: any) => {
      return colorMap[value]
    })
    .label(
      'value',
      (val: string) => {
        return {
          content: `${val}`
        }
      },
      {
        style: {
          fill: `${labelColor}`,
          fontSize: 23,
          fontWeight: 'bold'
        },
        position: 'middle',
        layout: {
          type: 'limit-in-shape'
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

  const annotation = document.getElementById('annotation')
  const annotationData = chartDataStore.assistData
  // console.log(annotationData)
  annotation.innerHTML = `
    <div class="annotation">
    <p>
      <img class="annotation-img" style="bottom: 300px;right: 200px;" src="../src/assets/province/${annotationData[0].short}.png"></img>
    </p>
    <P class="annotation-text" style="bottom: 100px;right: 150px;">${annotationData[0].short}<br/>
    专科生人数：${annotationData[0].value} 万人<br/>
    本科生人数：${annotationData[1].value} 万人<br/>
  总人数：${annotationData[0].Total} 万人<br/>
    </P>
    </div>
    `

  // 数据配置
  chart.changeData(chartDataStore.dynamicData)
}

export { initChart, updateChart }
