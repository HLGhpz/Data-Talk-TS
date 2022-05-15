import { Chart } from '@antv/g2'
import { useChartDataStore } from '@/stores'
import { storeToRefs } from 'pinia'
import inserCss from 'insert-css'
import { chown } from 'fs'

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
    padding: [100, 100, 100, 100]
  })

  // 设置图表数据
  chart.data(chartDataStore.rowData)

  // 设置图表度量
  chart.scale({
    dayOfWeek: {
      type: 'timeCat',
      value: [0, 1, 2, 3, 4, 5, 6]
    },
    weekOfMonth: {
      type: 'timeCat',
      value: [0, 1, 2, 3, 4, 5]
    },
    year: {
      type: 'cat'
    },
    NewDeaths: {
      type: 'linear',
      max: 5000,
      min: 0,
      sync: true
    },
    Date: {
      type: 'time'
    }
  })

  chart.axis(false)

  // 设置图表图例
  chart.legend('NewDeaths', {
    position: 'bottom',
    offsetY: -30
  })

  chart.tooltip({
    title: 'Date',
    showMarkers: false
  })

  // 设置数据分面
  chart.facet('list', {
    fields: ['monthAlias'],
    cols: 5,
    padding: [0, 15, 30, 15],
    columnTitle: {
      offsetY: 0,
      style: {
        fontSize: 18,
        textAlign: 'center',
        fill: '#666'
      }
    },
    eachView: (view) => {
      view
        .polygon()
        .position('dayOfWeek*weekOfMonth')
        .color(
          'NewDeaths',
          '#ffffff-#ffebee-#ffcdd2-#ef9a9a-#e57373-#ef5350-#f44336-#d32f2f-#b71c1c-#891516-#590E0E-#000000'
        )
        .style({
          lineWidth: 1,
          stroke: '#fff'
        })
        .tooltip('NewDeaths*Date*dayOfWeek*weekOfMonth')
    }
  })
  chart.coordinate().reflect('y')
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
  // `
  console.log(chartDataStore.startToEndData)

  // 数据配置
  chart.changeData(chartDataStore.startToEndData)
}

export { initChart, updateChart }
