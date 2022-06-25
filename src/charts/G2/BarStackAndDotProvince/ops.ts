/*
 * @Author: HLGhpz
 * @Date: 2022-05-08 15:27:29
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-06-22 22:22:41
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
let barView: any = null
let dotView: any = null

const padd = {
  left: 75,
  right: 200,
  top: 50,
  bottom: 25
}
const dataRegion = {
  min: 0,
  max: 19
}
let kind = 'EdibleOil'
let kindName = '食用油'

// const showDataLength = 15
const barSize = 42
const defaultColor = '#ee3f4d'
const labelColor = '#fff'
const yLableColor = '#2b1216'

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

  barView = chart.createView({
    region: {
      start: { x: 0, y: 0 },
      end: { x: 1, y: 1 }
    }
  })

  dotView = chart.createView({
    region: {
      start: { x: 0, y: 0 },
      end: { x: 1, y: 1 }
    }
  })

  // 设置图表数据
  barView.data(
    _.chain(chartDataStore.rowData)
      .filter((item) => item.Category === kind)
      .value()
  )

  // 设置图表度量
  barView.scale({
    Short: {
      type: 'cat',
      formatter: (Value: any) => {
        return Value
      },
      tickCount: 12
    },
    Value: {
      min: dataRegion.min,
      max: dataRegion.max
    }
  })

  // 设置坐标轴
  barView.coordinate().transpose()

  barView.axis('Short', {
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

  barView.axis('Value', {
    label: null,
    line: null,
    tickLine: null,
    grid: null
  })

  // 设置图表序列
  barView.legend(false)

  // 设置图表
  barView
    .interval()
    .adjust('stack')
    .position('Short*Value')
    .size(barSize)
    .color('Category', ['#5EA4E0'])
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

  dotView.data(
    _.chain(chartDataStore.rowData)
      .filter((item) => item.Category !== kind)
      .value()
  )

  dotView.scale({
    Short: {
      type: 'cat'
    },
    Value: {
      min: dataRegion.min,
      max: dataRegion.max
    }
  })

  dotView.coordinate().transpose()

  dotView.legend(false)

  dotView.axis('Short', false)
  dotView.axis('Value', false)
  dotView.legend(false)
  dotView
    .point()
    .position('Short*Value')
    .size(barSize / 5)
    .color('Category', ['#E71B24', '#FCCE10'])
    .style({
      fillOpacity: 1,
      lineWidth: 0.1
    })
    .shape('circle')

  chart.legend(false)
  chart.render()

  console.log(chart)
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
  annotation.innerHTML = `
    <div class="annotation">
    <p>
      <img class="annotation-img" style="bottom: 400px;right: 200px;" src="../src/assets/province/${
        annotationData[0].Short
      }.png"></img>
    </p>
    <P class="annotation-text" style="bottom: 100px;right: 150px;">${
      annotationData[0].Short
    }<br/>
    人均${kindName}消费量<br/>
    全体居民：${annotationData[2].Value} ${unit[`${kind}`]}<br/>
    城镇：${annotationData[1].Value} ${unit[`${kind}`]}<br/>
    农村：${annotationData[0].Value} ${unit[`${kind}`]}<br/>
    排行：${annotationData[0][`${kind}Index`]}<br/>
    </P>
    </div>
    `

  // 数据配置
  barView.changeData(
    _.chain(chartDataStore.dynamicData)
      .filter((item) => item.Category === kind)
      .value()
  )

  dotView.changeData(
    _.chain(chartDataStore.dynamicData)
      .filter((item) => item.Category !== kind)
      .value()
  )
}

export { initChart, updateChart }
