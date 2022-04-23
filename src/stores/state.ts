/*
 * @Author: HLGhpz
 * @Date: 2022-04-14 21:20:02
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-04-23 15:41:16
 * @Description:
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
 */

import { OperationEnum } from '@/enums'
import { defineStore } from 'pinia'

interface state {
  editModel: Boolean
  // 编辑当前的todo
  deleteModel: Boolean
  // 删除当前的todo
  showDataChange: Boolean
  // 图表数据继续变化
  editType: OperationEnum | undefined
  //编辑todo的类型
}

export const useStateStore = defineStore('state', {
  state: (): state => ({
    editModel: false,
    deleteModel: false,
    showDataChange: false,
    editType: undefined
  })
})
