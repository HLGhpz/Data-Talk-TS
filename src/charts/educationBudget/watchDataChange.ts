/*
 * @Author: HLGhpz
 * @Date: 2022-04-23 21:07:34
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-04-26 20:47:32
 * @Description:
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
 */

import { watch } from 'vue'
import { updateChart as updatePictorialBarChart } from './pictorialBar/pictorialBarOps'
import { useChartDataStore, useStateStore } from '@/stores'
import { storeToRefs } from 'pinia'

const stateStore = useStateStore()
const chartDataStore = useChartDataStore()

const { showDataChange } = storeToRefs(stateStore)

let dataIndex = 0
let showDataLength = 10
let chartInterval: any = null

// 监听图表数据变化
watch(showDataChange, (newValue) => {
  if (newValue) {
    chartInterval = setInterval(() => {
      chartDataStore.changeShowData(dataIndex, showDataLength)
      updatePictorialBarChart()
      dataIndex++
      // updateLineChart()
    }, 1000)
  } else {
    clearInterval(chartInterval)
  }
})
