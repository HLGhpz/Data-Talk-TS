/*
 * @Author: HLGhpz
 * @Date: 2022-05-08 15:24:57
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-07-17 13:51:04
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
let showDataLength = 12
let category = 1
let chartInterval: any = null

// 监听图表数据变化
watch(showDataChange, (newValue) => {
  if (newValue) {
    chartInterval = setInterval(() => {
      chartDataStore.changeCategoryStackData(
        dataIndex,
        showDataLength,
        category
      )
      updateChart()
      dataIndex++
    }, 800)
  } else {
    clearInterval(chartInterval)
  }
})
