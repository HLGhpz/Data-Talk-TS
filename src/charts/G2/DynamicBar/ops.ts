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
const showDataLength = 15
const barSize = 30

// 颜色映射
const colorMap = {
  UN: '#5EA4E0',
  US: '#000066',
  OWID_USS: '#E01F54',
  DE: '#001852',
  CN: '#E71B24',
  PL: '#f5e8c8',
  FR: '#b8d2c7',
  GB: '#c6b38e',
  DK: '#a4d8c2',
  CA: '#f3d999',
  BR: '#d3758f',
  HU: '#dcc392',
  OWID_YGS: '#2e4783',
  OWID_CZS: '#82b6e9',
  MX: '#ff6347',
  IT: '#a092f1',
  NL: '#0a915d',
  AT: '#eaf889',
  RO: '#6699FF',
  VN: '#ff6666',
  LU: '#3cb371',
  JP: '#d5b158',
  ES: '#38b6b6',
  PH: '#E01F54',
  RU: '#001852',
  UA: '#f5e8c8',
  KR: '#b8d2c7',
  BE: '#c6b38e',
  TH: '#a4d8c2',
  MM: '#f3d999'
}

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
    height: ${barSize}px;
    width: ${barSize}px;
  }

  .annotation-text {
    position: fixed;
    font-size: 300px;
    color: #424242;
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
    label: {
      style: {
        fontSize: 22,
        fontWeight: 'bold',
        fill: '#b71c1c'
      },
      offset: 25,
      formatter: (val: any) => {
        return val / 10000
      }
    },
    line: null,
    tickLine: null,
    grid: {
      line: {
        style: {
          type: 'line',
          stroke: '#b71c1c',
          lineDash: [4, 4],
          strokeOpacity: 0.5
        }
      }
    }
  })

  // 设置图表
  chart
    .interval()
    .position('zhName*Production')
    .size(barSize)
    .color('iso2Code', (val: string) => {
      return colorMap[val]
    })
    .label('Production', {
      style: {
        fill: '#424242',
        fontSize: 22
      },
      content: (obj) => {
        return `${(obj.Production / 10000).toFixed(2)} 万吨`
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
  console.log('dynamicData', chartDataStore.dynamicData)
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
  console.log(chartDataStore.assistData.Year)
  let assistHtml = `<p class="annotation-text" style="bottom: 150px; right: 150px;">${
    chartDataStore.assistData.Year
  }</p>
  <p class="annotation-text" style="bottom: 130px; right: 160px; font-size: 25px;">世界猪肉总产量：${(
    chartDataStore.assistData.Production / 10000
  ).toFixed(2)} 万吨</p>`
  html.push(assistHtml)
  annotation.innerHTML = html.join('')
}

export { initChart, updateChart }
