/*
 * @Author: HLGhpz
 * @Date: 2022-05-08 15:27:29
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-06-15 21:34:40
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
// const topic = '牛肉'
const defaultColor = '#fff'
const labelColor = '#fff'
const yLableColor = '#424242'

// 颜色映射
const colorMap = {
  SummerGrain: '#28afea',
  AutumnGrain: '#fcd217',
  EarlyGrain: '#ee3f4d'
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
  .annotation-text {
    position: fixed;
    font-size: 160px;
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
    Year: {
      type: 'timeCat',
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

  chart.axis('Year', {
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

  chart.axis('Product', {
    label: null,
    line: null,
    tickLine: null,
    grid: null
  })

  // 设置图表
  chart
    .interval()
    .adjust('stack')
    .position('Year*Product')
    .size(barSize)
    .color('Category', (val) => {
      return colorMap[val]
    })
    .label(
      'Product',
      (val: string) => {
        return {
          content: `${val}`
        }
      },
      {
        style: {
          fill: '#fff',
          fontSize: 25,
          fontWeight: 'bold'
        },
        position: 'middle'
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
  console.log('annotationData', annotationData)
  annotation.innerHTML = `<p class="annotation-text" style="bottom:200px; right: 150px;">
    ${annotationData[0].Year}
  </p>
  <p class="annotation-text" style="bottom:80px; right: 230px;font-size: 24px">
    粮食总产量：${annotationData[3].Product}万吨<br/>
    早稻产量：${annotationData[0].Product}万吨<br/>
    夏粮产量：${annotationData[1].Product}万吨<br/>
    秋稻产量：${annotationData[2].Product}万吨<br/>
  </p>`

  // 数据配置
  chart.changeData(chartDataStore.dynamicData)
}

export { initChart, updateChart }
