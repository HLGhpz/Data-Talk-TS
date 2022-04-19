/*
 * @Author: HLGhpz
 * @Date: 2022-04-14 21:20:02
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-04-18 23:41:56
 * @Description:
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
 */

import { defineStore } from 'pinia'

interface state {
  editModel: Boolean
  deleteModel: Boolean
}

export const useStatuStore = defineStore('statu', {
  state: (): state => ({
    editModel: false,
    deleteModel: false
  }),
  actions: {
    onStatu(stateName: 'editModel' | 'deleteModel') {
      console.log('stateName', stateName)
      if (stateName == 'editModel') {
        this.editModel = true
      } else if (stateName == 'deleteModel') {
        this.deleteModel = true
      }
    },
    offStatu(stateName: 'editModel' | 'deleteModel') {
      if (stateName == 'editModel') {
        this.editModel = false
      } else if (stateName == 'deleteModel') {
        this.deleteModel = false
      }
    }
  }
})
