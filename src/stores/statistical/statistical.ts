/*
 * @Author: HLGhpz
 * @Date: 2022-06-06 16:45:37
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-06-06 16:48:00
 * @Description:
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
 */
import { defineStore } from 'pinia'

interface Statistical {
  count: number | undefined
  // 数量
}

export const useStatisticalStore = defineStore('statistical', {
  state: (): Statistical => ({
    count: undefined
  })
})
