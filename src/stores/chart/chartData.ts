/*
 * @Author: HLGhpz
 * @Date: 2022-04-23 15:06:38
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-04-23 19:44:42
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
    showData: []
  }),
  getters: {},
  actions: {
    async getChartData(fileName: string) {
      const rowData = (await getData('api/data', fileName)).data
      this.rowData = rowData
    },
    changeShowData(startIndex: number, showDataLength: number) {
      const stateStore = useStateStore()
      let showData = []
      let rowLength = this.rowData.length
      if (startIndex < showDataLength) {
        showData = this.rowData.slice(0, startIndex)
      } else if (startIndex >= showDataLength && startIndex <= rowLength) {
        showData = this.rowData.slice(startIndex - showDataLength, startIndex)
      } else {
        showData = this.rowData.slice(rowLength - showDataLength, rowLength)
        stateStore.showDataChange = false
      }
      this.showData = showData
      return showData
    }
  }
})
