/*
 * @Author: HLGhpz
 * @Date: 2022-05-08 15:27:29
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-07-26 16:40:07
 * @Description:
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
 */

import { Chart } from '@antv/g2'
import { useChartDataStore } from '@/stores'
import { storeToRefs } from 'pinia'
import inserCss from 'insert-css'
import { dropRight } from 'lodash'

// 图表变量
let chart: any = null
const padd = {
  left: 100,
  right: 150,
  top: 200,
  bottom: 50
}
const dataRegion = {
  min: 0,
  max: 19
}
let kind = ''
let catData = '年份'
let valueData = 'Value'
let colorData = 'Category'

// const showDataLength = 15
const barSize = 42
const defaultColor = '#b24242'
const labelColor = '#fff'
const yLableColor = '#142664'

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

  .annotation-flag {
    position: fixed;
    height: 60px;
    width: 80px;
  }

  .annotation-text {
    position: fixed;
    font-size: 35px;
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
    catData: {
      type: 'cat',
      formatter: (Value: any) => {
        return Value
      },
      tickCount: 6
    },
    valueData: {
      min: 0
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
  // chart.coordinate().transpose()
  chart.coordinate()

  chart.axis(`${catData}`, {
    label: {
      style: {
        fontSize: 26,
        fill: `${yLableColor}`,
        fontWeight: 'bold'
      },
      offset: 20
    },
    line: null,
    tickLine: null,
    grid: null
  })

  chart.axis(`${valueData}`, {
    label: false,
    line: null,
    tickLine: null,
    grid: null
  })

  // 设置图表序列
  chart.legend(false)

  // 设置图表
  chart
    .line()
    .adjust('stack')
    .position(`${catData}*${valueData}`)
    .shape('smooth')
    .size(2)
    .color(`${colorData}`, [
      '#00b0ff',
      '#ee3f4d',
      '#51c4d3',
      '#ffc904',
      '#1ba784'
    ])
    .style({
      fillOpacity: 1
    })

  chart
    .area()
    .adjust('stack')
    .position(`${catData}*${valueData}`)
    .shape('smooth')
    // .size(barSize)
    .color(`${colorData}`, [
      '#00b0ff',
      '#ee3f4d',
      '#51c4d3',
      '#ffc904',
      '#1ba784'
    ])
    .style({
      fillOpacity: 0.6
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

  const annotation = document.getElementById('annotation')
  const annotationData = chartDataStore.assistData
  const unit = chartDataStore.unit

  // // console.log(annotationData)
  annotation.innerHTML = `
    <div class="annotation">
    <P class="annotation-text" style="top: 30px;left: 30px;">
      ${annotationData[0].年份}<br/>
    铁路：${annotationData[0].Value} 万吨<br/>
    公路：${annotationData[1].Value} 万吨<br/>
    水路：${annotationData[2].Value} 万吨<br/>
    民航：${annotationData[3].Value} 万吨<br/>
    管道：${annotationData[4].Value} 万吨<br/>
    货运量总计：${annotationData[0].货运量总计} 万吨
    </P>
    </div>
    `

  // annotation.innerHTML = `
  // <div class="annotation">
  // <p class="annotation-text">${annotationData.Sport}</p>
  // <P class="annotation-text">${annotationData.Athlete}</P>
  // <P class="annotation-text">代言：$${annotationData.Endorsements}M</P>
  // <P class="annotation-text">薪酬：$${annotationData.Salary}M</P>
  // <P class="annotation-text">排名：${annotationData.Rank}</P>
  // </div>
  // `

  // 数据配置
  chart.changeData(chartDataStore.dynamicData)
}

export { initChart, updateChart }
