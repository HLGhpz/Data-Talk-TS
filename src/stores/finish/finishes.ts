/*
 * @Author: HLGhpz
 * @Date: 2022-04-07 21:36:42
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-04-29 15:22:25
 * @Description:
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
 */
import dayjs from 'dayjs'
import { defineStore } from 'pinia'
import { selectTodo, updateTodo, createTodo } from '@/api/crud'
import { Finish, FinishInfo } from '@/types/store'

export const useFinishStore = defineStore('finishes', {
  state: () => ({
    finishes: [] as Finish[]
  }),
  getters: {},
  actions: {
    async create(finishInfo: FinishInfo) {
      finishInfo.createDays = dayjs().diff(finishInfo.createdAt, 'day') + 1
      const finish = (await createTodo('api/finish', finishInfo)).data
      this.$state.finishes.push(finish)
    },
    async select() {
      const finish = (await selectTodo('api/finish')).data
      this.finishes = finish
    },
    async update(finishInfo: FinishInfo) {
      const msg = await updateTodo('api/finish', finishInfo)
      if (msg.status === 200) {
        this.select()
      }
    }
  }
})
