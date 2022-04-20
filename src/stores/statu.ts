/*
 * @Author: HLGhpz
 * @Date: 2022-04-14 21:20:02
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-04-20 11:31:27
 * @Description:
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
 */

import { defineStore } from 'pinia'

interface state {
  editModel: Boolean
  deleteModel: Boolean
  showChart: Boolean
}

export const useStatuStore = defineStore('statu', {
  state: (): state => ({
    editModel: false,
    deleteModel: false,
    showChart: false
  })
})
