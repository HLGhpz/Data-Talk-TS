/*
 * @Author: HLGhpz
 * @Date: 2022-05-08 15:27:29
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-07-14 18:20:51
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
  left: 200,
  right: 450,
  top: 100,
  bottom: 50
}
const dataRegion = {
  min: 0,
  max: 19
}
let kind = '通货膨胀率'

// const showDataLength = 15
const barSize = 42
const defaultColor = '#eb3c70'
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
    国家: {
      type: 'cat',
      formatter: (Value: any) => {
        return Value
      },
      tickCount: 12
    },
    Value: {}
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

  chart.axis('国家', {
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
    .position('国家*Value')
    .size(barSize)
    .color('Value', (item) => {
      console.log(item)
      if (item < 0) {
        return '#66c18c'
      } else if (item < 5) {
        return '#eeb8c3'
      } else if (item < 10) {
        return '#ee4866'
      } else if (item < 30) {
        return '#cc163a'
      } else {
        return '#82111f'
      }
    })
    .style({
      fillOpacity: 1
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
  const unit = chartDataStore.unit

  console.log(annotationData[0].编码)
  // // console.log(annotationData)
  annotation.innerHTML = `
    <div class="annotation">
    <p class="annotation-flag fi fi-${annotationData[0].编码.toLowerCase()}" style="bottom: 350px;right: 200px;"></p>
    <P class="annotation-text" style="bottom: 100px;right: 100px;">
    ${annotationData[0].国家}<br/>
    通货膨胀率：${annotationData[0].Value} %<br/>
    失业率：${annotationData[0].失业率} %<br/>
    利率：${annotationData[0].利率} %<br/>
    通货膨胀率排行：${annotationData[0][`${kind}Index`]}
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
