/*
 * @Author: HLGhpz
 * @Date: 2022-04-23 21:07:34
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-04-23 22:40:56
 * @Description:
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
 */

import { watch } from 'vue'
import { updateChart } from './pictorialBar/pictorialBarOps'
import { useChartDataStore, useStateStore } from '@/stores'
import { storeToRefs } from 'pinia'

const stateStore = useStateStore()
const chartDataStore = useChartDataStore()

const { showDataChange } = storeToRefs(stateStore)

let startIndex = 0
let showDataLength = 5
let chartInterval: any = null

// 监听图表数据变化
watch(showDataChange, (newValue) => {
  console.log('showDataChange', newValue)
  if (newValue) {
    chartInterval = setInterval(() => {
      startIndex++
      chartDataStore.changeShowData(startIndex, showDataLength)
      updateChart()
    }, 1000)
  } else {
    clearInterval(chartInterval)
  }
})
