/*
 * @Author: HLGhpz
 * @Date: 2022-04-26 15:38:43
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-05-31 21:13:15
 * @Description:
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
 */

import { EChartsOption } from 'echarts'
import * as echarts from 'echarts'

let chart: any = null

// 初始化配置
const initOption: EChartsOption = {
  graphic: {
    elements: [
      {
        type: 'text',
        left: 'center',
        top: 'center',
        style: {
          text: 'HLG   DATA',
          fontSize: 150,
          fontWeight: 'bold',
          lineDash: [0, 200],
          lineDashOffset: 0,
          fill: 'transparent',
          stroke: '#ee3f4d',
          lineWidth: 1,
          fontStyle: 'italic'
        },
        keyframeAnimation: {
          duration: 4000,
          loop: true,
          keyframes: [
            {
              percent: 0.7,
              style: {
                // fill: 'transparent',
                lineDashOffset: 200,
                lineDash: [200, 0]
              }
            },
            {
              percent: 1,
              style: {
                fill: '#ee3f4d'
              }
            }
          ]
        }
      }
    ]
  }
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
 * @description:屏幕自适应
 * @param {*}
 * @return {*}
 */
function adapterChart() {
  chart.resize()
}

export { initChart, adapterChart }
