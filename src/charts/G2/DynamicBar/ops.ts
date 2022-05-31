import { Chart } from '@antv/g2'
import { useChartDataStore } from '@/stores'
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
const topic = '菠萝'
const defaultColor = '#ee2c79'
const labelColor = '#33141e'
const cityColor = '#3A4C3E'

// 颜色映射
const colorMap = {
  UN: '#5EA4E0',
  US: '#000066',
  NG: '#C1232B',
  TH: '#27727B',
  BR: '#FCCE10',
  MX: '#E87C25',
  CN: '#E71B24',
  MY: '#B5C334',
  ZA: '#FE8463',
  PH: '#9BCA63',
  CD: '#FAD860',
  IN: '#F3A43B',
  AU: '#60C0DD',
  CO: '#D7504B',
  VN: '#C6E579',
  PR: '#F4E001',
  ID: '#F0805A',
  JP: '#26C0C0',
  CI: '#C1232B',
  BD: '#27727B',
  EC: '#FCCE10',
  KE: '#E87C25',
  CR: '#B5C334',
  VE: '#FE8463',
  GH: '#9BCA63',
  PE: '#FAD860',
  DO: '#F3A43B',
  BJ: '#60C0DD',
  AO: '#D7504B'
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
        fill: `${cityColor}`,
        fontWeight: 'bold'
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
        fill: `${labelColor}`
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
          stroke: `${labelColor}`,
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
        fill: `${defaultColor}`,
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
  <p class="annotation-text" style="bottom: 130px; right: 160px; font-size: 25px;">世界${topic}总产量：${(
    chartDataStore.assistData.Production / 10000
  ).toFixed(2)} 万吨</p>`
  html.push(assistHtml)
  annotation.innerHTML = html.join('')
}

export { initChart, updateChart }
