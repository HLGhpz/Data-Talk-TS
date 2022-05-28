import { Chart } from '@antv/g2'
import { useChartDataStore } from '@/stores'
import { storeToRefs } from 'pinia'
import inserCss from 'insert-css'

// 图表变量
let chart: any = null

// 全局变量
const chartDataStore = useChartDataStore()
// const { latestData } = storeToRefs(chartDataStore)

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
    padding: [100, 200, 100, 200]
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
    .size(26)
    .color('zhName')
    .label('Production', {
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
  // const annotation = document.getElementById('annotation')
  // const annotationData = latestData.value
  // annotation.innerHTML = `
  // <div class="annotation">
  // <span class="annotation-flag fi fi-${annotationData.Short.toLowerCase()}"></span>
  // <P class="annotation-text">${annotationData.Zh}：${
  //   annotationData.DefenseSpend
  // } 亿＄</P>
  // <P class="annotation-text">排名：${annotationData.Index}</P>
  // </div>
  // `
  // // 数据配置
  chart.changeData(chartDataStore.dynamicData)
}

export { initChart, updateChart }
