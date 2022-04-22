/*
 * @Author: HLGhpz
 * @Date: 2022-04-15 11:13:20
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-04-21 17:39:19
 * @Description:
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
 */

import { defineStore } from 'pinia'
import { TodoInfo } from '@/types/store'

export const useTodoInfoStore = defineStore('todoInfo', {
  state: (): TodoInfo => ({
    id: undefined,
    title: undefined,
    abstract: undefined,
    dataLink: undefined,
    dataType: undefined,
    chartLink: undefined,
    chartType: undefined,
    chartTypes: undefined,
    tag: undefined
  })
})
