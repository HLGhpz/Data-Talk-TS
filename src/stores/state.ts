/*
 * @Author: HLGhpz
 * @Date: 2022-04-14 21:20:02
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-04-21 17:28:32
 * @Description:
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
 */

import { OperationEnum } from '@/enums'
import { defineStore } from 'pinia'

interface state {
  editModel: Boolean
  deleteModel: Boolean
  showChart: Boolean
  editType: OperationEnum | undefined
}

export const useStateStore = defineStore('state', {
  state: (): state => ({
    editModel: false,
    deleteModel: false,
    showChart: false,
    editType: undefined
  })
})
