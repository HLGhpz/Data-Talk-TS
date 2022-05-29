import { Chart, registerShape } from '@antv/g2'
import { useChartDataStore } from '@/stores'
import { storeToRefs } from 'pinia'
import inserCss from 'insert-css'

// 图表变量
let chart: any = null
const padd = {
  left: 200,
  right: 200,
  top: 100,
  bottom: 100
}
const showDataLength = 20
const barSize = 26

// 全局变量
const chartDataStore = useChartDataStore()
// const { latestData } = storeToRefs(chartDataStore)

inserCss(`
  .annotation {
    position: fixed;
    height: 100%;
    width: 100%;
    z-index: 9999;
  }

  .annotation-flag {
    position: fixed;
    z-index: 9999;
    height: 26px;
  }

  .annotation-text {
    font-size: 100px;
    color: #757575;
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
  chart.data(chartDataStore.initData)

  // 设置图表度量
  chart.scale({
    Production: {}
  })

  // 设置图表图例
  chart.legend(false)

  // 设置坐标轴
  chart.coordinate().transpose()

  chart.axis('zhName', {
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

  chart.axis('Production', {
    label: null,
    line: null,
    tickLine: null,
    grid: null
  })

  // 设置图表
  chart
    .interval()
    .position('zhName*Production')
    .size(barSize)
    .color('zhName')
    .label('Production', {
      style: {
        fill: '#424242',
        fontSize: 22
      }
    })

  updateAnnotation()
  chart.on('beforechangesize', updateAnnotation)
  chart.render()
}

/**
 * @description:图表的数据更新
 * @param {*} option
 * @return {*}
 */
function updateChart() {
  // // 数据配置
  updateAnnotation()
  chart.changeData(chartDataStore.dynamicData)
}

function updateAnnotation() {
  let annotationData = []
  if (!chartDataStore.dynamicData.length) {
    annotationData = chartDataStore.initData
  } else {
    annotationData = chartDataStore.dynamicData
  }
  const annotation = document.getElementById('annotation')
  const html: any = []
  let winHeight = window.innerHeight
  let gap = (winHeight - padd.top - padd.bottom) / showDataLength
  for (let i = 1; i <= showDataLength; i++) {
    let miny = padd.bottom + gap * i - gap / 2 - barSize / 2
    html.push(
      `<p class="annotation-flag fi fi-${annotationData[
        showDataLength - i
      ].iso2Code.toLowerCase()}" style="top: ${miny}px; left: ${
        padd.left + 5
      }px;"></p>`
    )
  }
  let assistHtml = `<p class="annotation-text" style="bottom: 150px; right: 150px;">${chartDataStore.assistData.Year}</p>`
  html.push(assistHtml)
  annotation.innerHTML = html.join('')
}

export { initChart, updateChart }
