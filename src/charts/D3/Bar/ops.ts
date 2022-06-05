/*
 * @Author: HLGhpz
 * @Date: 2022-05-08 15:27:29
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-06-05 12:33:28
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
  left: 400,
  right: 300,
  top: 100,
  bottom: 100
}
const defaultColor = '#2775b6'
const colorMap = {
  US: '#000066',
  JP: '#C1232B',
  FI: '#27727B',
  CN: '#E71B24',
  FR: '#FCCE10',
  DE: '#E87C25',
  IT: '#B5C334',
  KR: '#FE8463',
  SA: '#9BCA63',
  RU: '#FAD860',
  CH: '#F3A43B',
  GB: '#60C0DD',
  NL: '#D7504B',
  LU: '#C6E579',
  AU: '#F4E001',
  BR: '#F0805A',
  CA: '#26C0C0',
  AE: '#C1232B',
  CZ: '#27727B',
  ES: '#FCCE10'
}

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

.annotation-flag {
  height: 90px;
  width: 120px;
}

.annotation-text {
  position: fixed;
  color: ${defaultColor};
  opacity: 0.5;
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
  // 自定义样式
  // chart.theme({
  //   styleSheet: {
  //     paletteQualitative10: [
  //       '#E01F54',
  //       '#001852',
  //       '#f5e8c8',
  //       '#b8d2c7',
  //       '#c6b38e',
  //       '#a4d8c2',
  //       '#f3d999',
  //       '#d3758f',
  //       '#dcc392',
  //       '#2e4783'
  //     ],
  //     paletteQualitative20: [
  //       '#E01F54',
  //       '#001852',
  //       '#f5e8c8',
  //       '#b8d2c7',
  //       '#c6b38e',
  //       '#a4d8c2',
  //       '#f3d999',
  //       '#d3758f',
  //       '#dcc392',
  //       '#2e4783',
  //       '#82b6e9',
  //       '#ff6347',
  //       '#a092f1',
  //       '#0a915d',
  //       '#eaf889',
  //       '#6699FF',
  //       '#ff6666',
  //       '#3cb371',
  //       '#d5b158',
  //       '#38b6b6'
  //     ]
  //   }
  // })

  // 设置图表数据
  chart.data(chartDataStore.rowData)

  // 设置图表度量
  chart.scale({
    Rmax: {
      // max: 130,
      min: 0
    },
    Name: {
      type: 'cat'
    },
    Computer: {
      type: 'cat'
    }
  })

  chart.legend(false)

  // 设置坐标轴
  chart.coordinate().transpose()
  // .rotate(Math.PI * -0.02)

  chart.axis('Name', {
    label: {
      style: {
        fontSize: 28,
        fill: '#ffd111',
        fontWeight: 'bold'
      }
    },
    line: null,
    tickLine: null,
    grid: null
  })

  chart.axis('Rmax', {
    label: null,
    line: null,
    tickLine: null,
    grid: null
  })

  // 设置图表
  chart
    .interval()
    .position('Name*Rmax')
    .style({
      radius: [20, 20, 0, 0]
    })
    .size(35)
    .color('iso2Code', (val) => {
      return colorMap[val]
    })
    .label(
      'Rmax',
      (val: string) => {
        return {
          content: `${val} TFlop/s`
        }
      },
      {
        style: {
          fontSize: 35,
          fill: '#ffd111',
          fontWeight: 'bold'
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
  // // 清除辅助标注
  chart.annotation().clear(true)
  const annotation = document.getElementById('annotation')
  const annotationData = latestData.value
  annotation.innerHTML = `
  <div class="annotation">
  <p class="annotation-text" style="bottom: 50px;right: 50px; font-weight: bold;font-size: 60px">${annotationData.Name}</p>
  <p class="annotation-text" style="bottom: 100px; right: 80px; font-size: 25px; font-weight: bold;">
    最大值：${annotationData.Rmax}TFlop/s
    峰值：${annotationData.Rmax}TFlop/s
  </p>
  </div>
  `

  // 数据配置
  chart.changeData(chartDataStore.startToEndData)
}

export { initChart, updateChart }
