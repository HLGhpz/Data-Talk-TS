/*
 * @Author: HLGhpz
 * @Date: 2022-04-15 11:13:20
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-04-29 15:07:33
 * @Description:
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
 */

import { defineStore } from 'pinia'
import { FinishInfo } from '@/types/store'

export const useFinishInfoStore = defineStore('finishInfo', {
  state: (): FinishInfo => ({
    id: undefined,
    title: undefined,
    note: undefined,
    star: undefined,
    like: undefined,
    coin: undefined
  })
})
