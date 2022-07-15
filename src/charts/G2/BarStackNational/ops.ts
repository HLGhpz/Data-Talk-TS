/*
 * @Author: HLGhpz
 * @Date: 2022-05-08 15:27:29
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-07-13 22:10:29
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
  right: 500,
  top: 100,
  bottom: 30
}
const dataRegion = {
  min: 0,
  max: 19
}
let kind = '参军人数'
let kindName = '人数'

// const showDataLength = 15
const barSize = 42
const defaultColor = '#2177b8'
const labelColor = '#fff'
const yLableColor = '#142664'

// 颜色映射
const colorMap = {
  北京: '#fad390',
  天津: '#f8c291',
  河北: '#6a89cc',
  山西: '#82ccdd',
  内蒙: '#b8e994',
  辽宁: '#f6b93b',
  吉林: '#e55039',
  黑龙江: '#4a69bd',
  上海: '#60a3bc',
  江苏: '#78e08f',
  浙江: '#fa983a',
  安徽: '#eb2f06',
  福建: '#1e3799',
  江西: '#3c6382',
  山东: '#38ada9',
  河南: '#e58e26',
  湖北: '#b71540',
  湖南: '#0c2461',
  广东: '#0a3d62',
  广西: '#079992',
  海南: '#FEA47F',
  重庆: '#25CCF7',
  四川: '#EAB543',
  贵州: '#55E6C1',
  云南: '#CAD3C8',
  西藏: '#F97F51',
  陕西: '#1B9CFC',
  甘肃: '#F8EFBA',
  青海: '#58B19F',
  宁夏: '#2C3A47',
  新疆: '#B33771',
  澳门: '#3B3B98',
  香港: '#FD7272',
  台湾: '#9AECDB'
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
    Short: {
      type: 'cat',
      formatter: (Value: any) => {
        return Value
      },
      tickCount: 12
    },
    Value: {
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
  chart.coordinate().transpose()

  chart.axis('民族', {
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
    .position('民族*Value')
    .size(barSize)
    .color('Category', [
      '#45b787',
      '#4a69bd',
      '#fa983a',
      '#eb3c70',
      '#813c85',
      '#78e08f',
      '#45b787',
      '#82CCDD',
      '#4a69bd',
      '#f2ce2b',
      '#fa983a',
      '#f0a1a8',
      '#eb3c70',
      '#813c85'
    ])
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

  //   <p>
  //   <img class="annotation-img" style="bottom: 300px;right: 150px;" src="../src/assets/province/${
  //     annotationData[0].ProvinceCode
  //   }.png"></img>
  // </p>
  let temp2 = ''
  let temp1 = ''
  if (annotationData[0].比重 === 0) {
    temp1 = '< 0.01'
  } else {
    temp1 = `${annotationData[0].比重}`
  }

  if (annotationData[0].参军比重 === 0) {
    temp2 = '< 0.01'
  } else {
    temp2 = `${annotationData[0].参军比重}`
  }
  // // console.log(annotationData)
  annotation.innerHTML = `
    <div class="annotation">
    <P class="annotation-text" style="bottom: 100px;right: 100px;">
    ${annotationData[0].民族}<br/>
    总人数：${annotationData[0].总人数}<br/>
    参军人数：${annotationData[0].Value} <br/>
    民族人口占比：${temp1} %<br/>
    解放军中占比：${temp2} %<br/>
    排行：${annotationData[0][`${kind}Index`]}
    </P>
    </div>
    `

  // 数据配置
  chart.changeData(chartDataStore.dynamicData)
}

export { initChart, updateChart }
