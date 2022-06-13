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
const topic = '牛肉'
const defaultColor = '#fff'
const labelColor = '#fff'
const cityColor = '#fff'

// 颜色映射
const colorMap = {
  UN: '#5EA4E0',
  US: '#000066',
  OWID_USS: '#C1232B',
  AR: '#27727B',
  FR: '#FCCE10',
  BR: '#E87C25',
  DE: '#B5C334',
  GB: '#FE8463',
  IT: '#9BCA63',
  CA: '#FAD860',
  AU: '#F3A43B',
  IN: '#60C0DD',
  ZA: '#D7504B',
  MX: '#C6E579',
  PL: '#F4E001',
  CO: '#F0805A',
  NZ: '#26C0C0',
  CN: '#E71B24',
  RU: '#C1232B',
  UA: '#27727B',
  KZ: '#FCCE10',
  ES: '#E87C25',
  TR: '#B5C334',
  PK: '#FE8463',
  UZ: '#9BCA63'
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
        fontSize: 24,
        fontWeight: 'bold'
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
  let assistHtml = `<p class="annotation-text" style="bottom: 150px; right: 150px;">${
    chartDataStore.assistData[0].Year
  }</p>
  <p class="annotation-text" style="bottom: 130px; right: 160px; font-size: 25px; font-weight: bold;">世界${topic}总产量：${(
    chartDataStore.assistData[0].Production / 10000
  ).toFixed(2)} 万吨</p>`
  html.push(assistHtml)
  annotation.innerHTML = html.join('')
}

export { initChart, updateChart }
