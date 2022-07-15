/*
 * @Author: HLGhpz
 * @Date: 2022-05-08 15:27:29
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-07-13 21:25:01
 * @Description:
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
 */

import { Chart } from '@antv/g2'
import { useChartDataStore } from '@/stores'
import { storeToRefs } from 'pinia'
import inserCss from 'insert-css'
import _ from 'lodash'

// 图表变量
let chart: any = null
let viewOne: any = null
let viewTwo: any = null
let viewThree: any = null
const padd = {
  left: 70,
  right: 200,
  top: 50,
  bottom: 50
}
const dataRegion = {
  min: 0,
  max: 19
}
let kind = '人数'
let kindName = '人数'

const lineSize = 7
const defaultColor = '#fa7e23'
const labelColor = '#fff'
const yLableColor = '#142664'

const colorMap = {
  CNY: '#f6b93b',
  RUB: '#FD7272',
  EUR: '#9AECDB'
}

// 颜色映射
// const colorMap = {
//   北京: '#fad390',
//   天津: '#f8c291',
//   河北: '#6a89cc',
//   山西: '#82ccdd',
//   内蒙: '#b8e994',
//   辽宁: '#f6b93b',
//   吉林: '#e55039',
//   黑龙江: '#4a69bd',
//   上海: '#60a3bc',
//   江苏: '#78e08f',
//   浙江: '#fa983a',
//   安徽: '#eb2f06',
//   福建: '#1e3799',
//   江西: '#3c6382',
//   山东: '#38ada9',
//   河南: '#e58e26',
//   湖北: '#b71540',
//   湖南: '#0c2461',
//   广东: '#0a3d62',
//   广西: '#079992',
//   海南: '#FEA47F',
//   重庆: '#25CCF7',
//   四川: '#EAB543',
//   贵州: '#55E6C1',
//   云南: '#CAD3C8',
//   西藏: '#F97F51',
//   陕西: '#1B9CFC',
//   甘肃: '#F8EFBA',
//   青海: '#58B19F',
//   宁夏: '#2C3A47',
//   新疆: '#B33771',
//   澳门: '#3B3B98',
//   香港: '#FD7272',
//   台湾: '#9AECDB'
// }

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

  viewOne = chart.createView({
    region: {
      start: { x: 0, y: 0 },
      end: { x: 1, y: 0.33 }
    }
  })
  viewTwo = chart.createView({
    region: {
      start: { x: 0, y: 0.33 },
      end: { x: 1, y: 0.66 }
    }
  })
  viewThree = chart.createView({
    region: {
      start: { x: 0, y: 0.66 },
      end: { x: 1, y: 1 }
    }
  })

  // 设置图表数据
  viewOne.data(
    _.filter(chartDataStore.rowData, (item) => {
      return item.货币 === 'CNY'
    })
  )

  // 设置图表度量
  viewOne.scale({
    日期: {},
    收盘: {
      formatter: (Value: any) => {
        return Value.toFixed(2)
      },
      tickCount: 5
      // min: 6.3,
      // max: 6.8
    }
  })

  // 设置坐标轴
  viewOne.coordinate()

  viewOne.axis('日期', false)

  viewOne.axis('收盘', {
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

  // 设置图表序列
  viewOne.legend(false)

  viewOne
    .line()
    .position('日期*收盘')
    .size(lineSize)
    .color('#ee3f4d')
    .shape('smooth')

  // 设置图表数据
  viewTwo.data(
    _.filter(chartDataStore.rowData, (item) => {
      return item.货币 === 'RUB'
    })
  )

  // 设置图表度量
  viewTwo.scale({
    日期: {},
    收盘: {
      formatter: (Value: any) => {
        return Value.toFixed(2)
      },
      tickCount: 5
      // min: 50,
      // max: 150
    }
  })

  // 设置坐标轴
  viewTwo.coordinate()

  viewTwo.axis('日期', false)

  viewTwo.axis('收盘', {
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

  // 设置图表序列
  viewTwo.legend(false)

  viewTwo
    .line()
    .position('日期*收盘')
    .size(lineSize)
    .color('#0137a1')
    .shape('smooth')

  // 设置图表数据
  viewThree.data(
    _.filter(chartDataStore.rowData, (item) => {
      return item.货币 === 'EUR'
    })
  )

  // 设置图表度量
  viewThree.scale({
    日期: {},
    收盘: {
      formatter: (Value: any) => {
        return Value.toFixed(2)
      },
      tickCount: 5
      // min: 0.85,
      // max: 1
    }
  })

  // 设置坐标轴
  viewThree.coordinate()

  viewThree.axis('日期', {
    label: {
      style: {
        fontSize: 22,
        fill: `${yLableColor}`,
        fontWeight: 'bold'
      },
      tickCount: 6,
      offset: 50
    },
    line: null,
    tickLine: null,
    grid: null
  })

  viewThree.axis('收盘', {
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

  // 设置图表序列
  viewThree.legend(false)

  viewThree
    .line()
    .position('日期*收盘')
    .size(lineSize)
    .color('#f7c600')
    .shape('smooth')

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

  let temp = ''
  if (annotationData[0].比重 === 0) {
    temp = '< 0.01'
  } else {
    temp = `${annotationData[0].比重}`
  }
  // // console.log(annotationData)
  annotation.innerHTML = `
    <div class="annotation">
    <P class="annotation-text" style="bottom: 100px;right: 100px;">
    日期：${annotationData[0].日期}<br/>
    美元兑人民币：${annotationData[0].收盘.toFixed(3)} <br/>
    美元兑卢布：${annotationData[1].收盘.toFixed(3)} <br/>
    美元兑欧元：${annotationData[2].收盘.toFixed(3)} <br/>
    </P>
    </div>
    `

  // 数据配置
  chart.changeData(chartDataStore.dynamicData)
  viewOne.changeData(
    _.filter(chartDataStore.dynamicData, (item) => {
      return item.货币 === 'CNY'
    })
  )
  viewTwo.changeData(
    _.filter(chartDataStore.dynamicData, (item) => {
      return item.货币 === 'RUB'
    })
  )
  viewThree.changeData(
    _.filter(chartDataStore.dynamicData, (item) => {
      return item.货币 === 'EUR'
    })
  )
  chart.render()
}

export { initChart, updateChart }
