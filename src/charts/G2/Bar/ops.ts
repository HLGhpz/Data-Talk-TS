/*
 * @Author: HLGhpz
 * @Date: 2022-05-08 15:27:29
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-05-12 22:20:32
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
    right: 100px;
    width: 600px;
    z-index: 9999;
  }

  .annotation-flag {
    height: 90px;
    width: 120px;
    color: #757575;
  }

  .annotation-text {
    font-size: 50px;
    color: #757575;
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
    padding: [100, 100, 100, 200]
  })

  // 设置图表数据
  chart.data(chartDataStore.rowData)

  // 设置图表度量
  chart.scale({
    DefenseSpend: {
      max: 8000,
      min: 0
    }
  })

  // 设置图表图例
  chart.legend(false)

  // 设置坐标轴
  chart.coordinate().transpose()

  chart.axis('Zh', {
    label: {
      style: {
        fontSize: 22,
        fill: '#424242'
      }
    },
    line: null,
    tickLine: null,
    grid: null
  })

  chart.axis('DefenseSpend', {
    label: null,
    line: null,
    tickLine: null,
    grid: null
  })

  // 设置图表
  chart
    .interval()
    .position('Zh*DefenseSpend')
    .size(26)
    .color('Zh')
    .label('DefenseSpend', {
      style: {
        fill: '#424242',
        fontSize: 22
      }
    })

  chart.render()
}

/**
 * @description:图表的数据更新
 * @param {*} option
 * @return {*}
 */
function updateChart() {
  // // 清除辅助标注
  // chart.annotation().clear(true)
  // const annotation = document.getElementById('annotation')
  // annotation.innerHTML = '<span class="fi fi-cn"></span>'
  const annotation = document.getElementById('annotation')
  const annotationData = latestData.value
  annotation.innerHTML = `
  <div class="annotation">
  <span class="annotation-flag fi fi-${annotationData.Short.toLowerCase()}"></span>
  <P class="annotation-text">${annotationData.Zh}：${annotationData.DefenseSpend}＄</P>
  <P class="annotation-text">排名：${annotationData.Index}</P>
  </div>
  `

  // // 设置辅助标注
  // chart.annotation().text({
  //   position: ['50%', '85%'],
  //   content: `${latestData.value.Zh}：${latestData.value.DefenseSpend}＄`,
  //   style: {
  //     fontSize: 50,
  //     fill: '#8b8b8b'
  //   }
  // })

  // 数据配置
  chart.changeData(chartDataStore.startToEndData)
}

export { initChart, updateChart }
