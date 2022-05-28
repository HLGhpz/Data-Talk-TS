/*
 * @Author: HLGhpz
 * @Date: 2022-05-28 20:39:35
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-05-28 21:47:56
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

const startYear = 1961
const endYear = 2018
let yearIndex = startYear
let chartInterval: any = null

// 监听图表数据变化
watch(showDataChange, (newValue) => {
  if (newValue) {
    chartInterval = setInterval(() => {
      chartDataStore.changeDynamicData(yearIndex, endYear)
      updateChart()
      yearIndex++
    }, 1000)
  } else {
    clearInterval(chartInterval)
  }
})
