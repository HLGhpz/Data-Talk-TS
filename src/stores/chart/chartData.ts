/*
 * @Author: HLGhpz
 * @Date: 2022-04-23 15:06:38
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-04-26 20:49:47
 * @Description:
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
 */

import { defineStore } from 'pinia'
import { getData } from '@/api/request'
import { useStateStore } from '../state'

export const useChartDataStore = defineStore('chartData', {
  state: () => ({
    rowData: [],
    startToEndData: [],
    zeroToEndData: [],
    latestData: {} as any
  }),
  getters: {},
  actions: {
    async getChartData(fileName: string) {
      const rowData = (await getData('api/data', fileName)).data
      this.rowData = rowData
    },
    changeShowData(dataIndex: number, showDataLength: number) {
      const stateStore = useStateStore()
      let startToEndData = []
      let rowLength = this.rowData.length
      if (dataIndex < showDataLength) {
        startToEndData = this.rowData.slice(0, dataIndex + 1)
      } else if (dataIndex >= showDataLength && dataIndex <= rowLength) {
        startToEndData = this.rowData.slice(
          dataIndex - showDataLength,
          dataIndex + 1
        )
      } else {
        startToEndData = this.rowData.slice(
          rowLength - showDataLength,
          rowLength
        )
        stateStore.showDataChange = false
      }
      this.zeroToEndData = this.rowData.slice(0, dataIndex + 1)
      this.startToEndData = startToEndData
      this.latestData = this.rowData[dataIndex]
    }
  }
})
