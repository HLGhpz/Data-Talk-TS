/*
 * @Author: HLGhpz
 * @Date: 2022-04-15 11:13:20
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-04-16 18:16:19
 * @Description:
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
 */

import { defineStore } from 'pinia'
import { TagEnum, OperationEnum } from '@/enums'
import { TodoInfo } from '@/types/store'


export const useTodoInfoStore = defineStore('todoInfo', {
  state: (): TodoInfo => ({
    id: 0,
    title: '',
    abstract: '',
    tag: TagEnum.Make,
    type: OperationEnum.Update
  })
})
