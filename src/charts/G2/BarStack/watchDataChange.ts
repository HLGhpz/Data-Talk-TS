/*
 * @Author: HLGhpz
 * @Date: 2022-05-08 15:24:57
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-06-14 22:20:20
 * @Description:
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
 */

import { watch } from 'vue'
import { useChartDataStore, useStateStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { updateChart } from './ops'

const stateStore = useStateStore()
const chartDataStore = useChartDataStore()
const { showDataChange } = storeToRefs(stateStore)

let dataIndex = 1
let showDataLength = 15
let startIndex = 1949
let endIndex = 2021
let chartInterval: any = null

// 监听图表数据变化
watch(showDataChange, (newValue) => {
  if (newValue) {
    chartInterval = setInterval(() => {
      chartDataStore.changeStackData(
        dataIndex,
        startIndex,
        endIndex,
        showDataLength
      )
      updateChart()
      dataIndex++
    }, 1000)
  } else {
    clearInterval(chartInterval)
  }
})
