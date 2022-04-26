/*
 * @Author: HLGhpz
 * @Date: 2022-04-23 21:07:34
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-04-24 16:37:59
 * @Description:
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
 */

import { watch } from 'vue'
// import { updateChart as updatePictorialBarChart } from './pictorialBar/pictorialBarOps'
// import { updateChart as updateLineChart } from './line/lineOps'
import { updateChart } from './picBarAndLine/picBarAndLineOps'
import { useChartDataStore, useStateStore } from '@/stores'
import { storeToRefs } from 'pinia'

const stateStore = useStateStore()
const chartDataStore = useChartDataStore()

const { showDataChange } = storeToRefs(stateStore)

let dataIndex = 0
let showDataLength = 5
let chartInterval: any = null

// 监听图表数据变化
watch(showDataChange, (newValue) => {
  if (newValue) {
    chartInterval = setInterval(() => {
      dataIndex++
      chartDataStore.changeShowData(dataIndex, showDataLength)
      updateChart()
      // updatePictorialBarChart()
      // updateLineChart()
    }, 1000)
  } else {
    clearInterval(chartInterval)
  }
})
