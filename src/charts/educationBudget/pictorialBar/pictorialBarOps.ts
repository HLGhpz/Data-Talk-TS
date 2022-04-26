import { EChartsOption } from 'echarts'
import { useChartDataStore, useChartStore } from '@/stores'
import { storeToRefs } from 'pinia'
import * as echarts from 'echarts'
import Funding from '@/assets/icons/Funding.png'

// 全局变量
const chartDataStore = useChartDataStore()
const chartStore = useChartStore()
const { startToEndData } = storeToRefs(chartDataStore)
const { winHeight } = storeToRefs(chartStore)

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
  fontSize: 20,
  formatter: (params: any) => {
    console.log('params', params)
  }
}

// 初始化配置
const initOption: EChartsOption = {
  grid: {
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
  console.log('initChart', chart.getOption())
}

/**
 * @description:图表的数据更新
 * @param {*} option
 * @return {*}
 */
function updateChart() {
  // 数据配置
  const dataOption: EChartsOption = {
    dataset: {
      source: startToEndData.value
    },
    series: [
      {
        encode: {
          x: 4,
          y: 1
        }
      }
    ]
  }
  chart.setOption(dataOption)
}

/**
 * @description:屏幕自适应
 * @param {*}
 * @return {*}
 */
function adapterChart() {
  winHeight.value = window.innerHeight
  let titleFontSize = (winHeight.value / 100) * 3.6
  let scaleSize = 0.6
  // 屏幕自适应配置
  const adapterOption: EChartsOption = {
    title: {
      textStyle: {
        fontSize: titleFontSize
      }
    },
    xAxis: {
      axisLabel: {
        fontSize: titleFontSize * scaleSize
      }
    },
    yAxis: {
      axisLabel: {
        fontSize: titleFontSize * scaleSize
      }
    }
  }
  chart.setOption(adapterOption)
  chart.resize()
}

export { initChart, updateChart, adapterChart }
