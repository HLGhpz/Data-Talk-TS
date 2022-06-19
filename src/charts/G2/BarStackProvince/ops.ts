/*
 * @Author: HLGhpz
 * @Date: 2022-05-08 15:27:29
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-06-19 22:41:14
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
  right: 600,
  top: 100,
  bottom: 50
}
// const showDataLength = 15
const barSize = 42
const defaultColor = '#fff'
const labelColor = '#fff'
const yLableColor = '#fff'

// 颜色映射
const colorMap = {
  PerCapitaManned: '#5EA4E0',
  PerCapitaCargo: '#FCCE10',
  PerCapitaOther: '#E71B24'
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
    Short: {
      type: 'cat',
      formatter: (Value: any) => {
        return Value
      },
      tickCount: 12
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

  chart.axis('Short', {
    label: {
      style: {
        fontSize: 26,
        fill: `${yLableColor}`,
        fontWeight: 'bold'
      }
    },
    line: null,
    tickLine: null,
    grid: null
  })

  chart.axis('Value', {
    label: null,
    line: null,
    tickLine: null,
    grid: null
  })

  // 设置图表序列
  chart.legend(false)

  // 设置图表
  chart
    .interval()
    .adjust('stack')
    .position('Short*Value')
    .size(barSize)
    .color('Category', (Value: any) => {
      return colorMap[Value]
    })
    .label(
      'Value',
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
  // // console.log(annotationData)
  annotation.innerHTML = `
    <div class="annotation">
    <p>
      <img class="annotation-img" style="bottom: 350px;right: 200px;" src="../src/assets/province/${annotationData[0].Short}.png"></img>
    </p>
    <P class="annotation-text" style="bottom: 100px;right: 150px;">${annotationData[0].Short}<br/>
    每百人汽车拥有量：${annotationData[0].PerCapita} 辆<br/>
    排行：${annotationData[0].Index}<br/>
    总汽车数：${annotationData[0]['Total']} 万辆<br/>
  占比：${annotationData[0]['Scale']}
    </P>
    </div>
    `

  // 数据配置
  chart.changeData(chartDataStore.dynamicData)
}

export { initChart, updateChart }
