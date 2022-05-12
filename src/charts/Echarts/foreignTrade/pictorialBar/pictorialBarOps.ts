import { EChartsOption } from 'echarts'
import { useChartDataStore } from '@/stores'
import { storeToRefs } from 'pinia'
import * as echarts from 'echarts'
import Funding from '@/assets/icons/Funding.png'

// 全局变量
const chartDataStore = useChartDataStore()
const { rowData, latestData } = storeToRefs(chartDataStore)

let chart: any = null

// 柱状图图标
const pathSymbols = {
  Funding: `image://${Funding}`
}

// 标签配置
const labelSetting = {
  show: true,
  position: 'right',
  offset: [10, 0],
  fontSize: 30,
  formatter: (params: any) => {
    return `${params.data['2022Budget']} 亿元`
  }
}

// 初始化配置
const initOption: EChartsOption = {
  dataset: {
    source: rowData.value
  },
  grid: {
    top: '13%',
    left: '15%'
  },
  xAxis: {
    max: 370,
    splitLine: { show: false },
    axisLabel: { show: false },
    axisTick: { show: false },
    axisLine: { show: false }
  },
  yAxis: {
    type: 'category',
    // inverse: true,
    splitLine: { show: false },
    axisTick: { show: false },
    axisLine: { show: false },
    axisLabel: {
      margin: 15
    }
  },
  series: [
    {
      name: '预算经费',
      type: 'pictorialBar',
      label: labelSetting as any,
      symbol: pathSymbols.Funding,
      symbolRepeat: true,
      symbolClip: true,
      symbolSize: [30, 30],
      barWidth: 30
    }
  ]
}

/**
 * @description:初始化图表
 * @param {*} option
 * @return {*}
 */
function initChart(chartDom: HTMLDivElement) {
  chart = echarts.init(chartDom)
  chart.setOption(initOption)
}

/**
 * @description:图表的数据更新
 * @param {*} option
 * @return {*}
 */
function updateChart() {
  // 数据配置
  const dataOption: EChartsOption = {
    series: [
      {
        encode: {
          x: '2022Budget',
          y: 'School'
        }
      }
    ],
    graphic: {
      elements: [
        {
          type: 'text',
          right: 200,
          bottom: 250,
          style: {
            text: `${latestData.value.School}：${latestData.value['2022Budget']} 亿元`,
            font: 'bold 60px Microsoft YaHei',
            fill: 'rgba(100,100,100,1)'
          }
        },
        {
          type: 'text',
          right: 200,
          bottom: 100,
          style: {
            text: `排名：${latestData.value.Index}`,
            font: 'bold 60px Microsoft YaHei',
            fill: 'rgba(241,147,156,1)'
          }
        }
      ]
    }
  }
  chart.setOption(dataOption)
}

/**
 * @description:屏幕自适应
 * @param {*}
 * @return {*}
 */
function adapterChart() {
  let winHeight = window.innerHeight
  let titleFontSize = (winHeight / 100) * 3.6
  let scaleSize = 0.6
  // 屏幕自适应配置
  const adapterOption: EChartsOption = {
    title: {
      textStyle: {
        fontSize: titleFontSize,
        fontWeight: 'bold'
      }
    },
    xAxis: {
      axisLabel: {
        fontSize: titleFontSize * scaleSize,
        fontWeight: 'bold'
      }
    },
    yAxis: {
      axisLabel: {
        fontSize: titleFontSize * scaleSize,
        fontWeight: 'bold'
      }
    }
  }
  chart.setOption(adapterOption)
  chart.resize()
}

export { initChart, updateChart, adapterChart }
