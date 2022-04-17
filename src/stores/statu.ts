/*
 * @Author: HLGhpz
 * @Date: 2022-04-14 21:20:02
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-04-16 15:46:53
 * @Description:
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
 */

import { defineStore } from 'pinia'

interface state {
  modelState: Boolean
}

export const useStatuStore = defineStore('statu', {
  state: (): state => ({
    modelState: false
  }),
  actions: {
    onStatu() {
      this.modelState = false
    },
    offStatu() {
      this.modelState = true
    }
  }
})
