import { EChartsOption } from 'echarts'
import { useChartDataStore } from '@/stores'
import { storeToRefs } from 'pinia'
import * as echarts from 'echarts'
import { PBook, EBook, Magazine, Newspaper } from '@/assets/icons'

// 全局变量
const chartDataStore = useChartDataStore()
const { startToEndData, latestData } = storeToRefs(chartDataStore)

let chart: any = null

// 柱状图图标
const pathSymbols = {
  PBook: `image://${PBook}`,
  EBook: `image://${EBook}`,
  Magazine: `image://${Magazine}`,
  Newspaper: `image://${Newspaper}`
}

// 标签配置
const labelSetting = {
  show: true,
  position: 'right',
  offset: [10, 0],
  fontSize: 30
  // formatter: (params: any) => {
  //   return `${params.data['2022Budget']} 亿元`
  // }
}

// 初始化配置
const initOption: EChartsOption = {
  grid: {
    top: '13%',
    left: '15%'
  },
  xAxis: {
    max: 120,
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
      name: '报纸',
      type: 'pictorialBar',
      stack: 'total',
      // label: labelSetting as any,
      // symbol: pathSymbols.Newspaper,
      // symbolRepeat: true,
      // symbolClip: true,
      // symbolSize: [30, 30],
      barWidth: 30
    },
    {
      name: '期刊',
      type: 'pictorialBar',
      stack: 'total',
      // label: labelSetting as any,
      // symbol: pathSymbols.Magazine,
      // symbolRepeat: true,
      // symbolClip: true,
      // symbolSize: [30, 30],
      barWidth: 30
    },
    {
      name: '电子书',
      type: 'pictorialBar',
      stack: 'total',
      // label: labelSetting as any,
      // symbol: pathSymbols.EBook,
      // symbolRepeat: true,
      // symbolClip: true,
      // symbolSize: [30, 30],
      barWidth: 30
    },
    {
      name: '实体书',
      type: 'pictorialBar',
      stack: 'total',
      // label: labelSetting as any,
      // symbol: pathSymbols.PBook,
      // symbolRepeat: true,
      // symbolClip: true,
      // symbolSize: [30, 30],
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
    dataset: {
      source: startToEndData.value
    },
    series: [
      {
        encode: {
          x: 'Newspaper',
          y: 'Year'
        }
      },
      {
        encode: {
          x: 'Magazine',
          y: 'Year'
        }
      },
      {
        encode: {
          x: 'EBook',
          y: 'Year'
        }
      },
      {
        encode: {
          x: 'PBook',
          y: 'Year'
        }
      }
    ]
    // graphic: {
    //   elements: [
    //     {
    //       type: 'text',
    //       right: 200,
    //       bottom: 250,
    //       style: {
    //         text: `${latestData.value.School}：${latestData.value['2022Budget']} 亿元`,
    //         font: 'bold 60px Microsoft YaHei',
    //         fill: 'rgba(100,100,100,1)'
    //       }
    //     },
    //     {
    //       type: 'text',
    //       right: 200,
    //       bottom: 100,
    //       style: {
    //         text: `排名：${latestData.value.Index}`,
    //         font: 'bold 60px Microsoft YaHei',
    //         fill: 'rgba(241,147,156,1)'
    //       }
    //     }
    //   ]
    // }
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
