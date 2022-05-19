/*
 * @Author: HLGhpz
 * @Date: 2022-05-16 12:26:31
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-05-19 17:12:59
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
let chartInterval: any = null

// 监听图表数据变化
watch(showDataChange, (newValue) => {
  if (newValue) {
    chartInterval = setInterval(() => {
      chartDataStore.changeShowData(dataIndex, showDataLength)
      independentUpdate()
      // updateChart()
      dataIndex++
    }, 1000)
  } else {
    clearInterval(chartInterval)
  }
})

function independentUpdate() {
  console.log(chartDataStore.zeroToEndData)
  // chartDataStore.independentData =
}
