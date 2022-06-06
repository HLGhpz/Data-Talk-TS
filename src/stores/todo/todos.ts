/*
 * @Author: HLGhpz
 * @Date: 2022-04-07 21:36:42
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-06-06 17:45:09
 * @Description:
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
 */
import { defineStore } from 'pinia'
import { selectTodo, updateTodo, createTodo, deleteTodo } from '@/api/crud'
import { Todo, TodoInfo } from '@/types/store'
import { useFinishStore } from '../finish/finishes'
import { useStatisticalStore } from '@/stores/statistical/statistical'
const statisticalStore = useStatisticalStore()
const finishStore = useFinishStore()

export const useTodoStore = defineStore('todos', {
  state: () => ({
    todos: [] as Todo[]
  }),
  getters: {},
  actions: {
    async create(todoInfo: TodoInfo) {
      const todo = (await createTodo('api/todo', todoInfo)).data
      this.$state.todos.push(todo)
    },
    async select(
      param: object = {
        page: 1,
        pageSize: 10
      }
    ) {
      const todos = (await selectTodo('api/todo', param)).data
      this.todos = todos.rows
      statisticalStore.count = todos.count
    },
    async update(todoInfo: TodoInfo) {
      if (
        (todoInfo.tag as any) === 'Achieve' ||
        (todoInfo.tag as any) === 'Abolish'
      ) {
        await finishStore.create(todoInfo)
        this.select()
      } else {
        const msg = await updateTodo('api/todo', todoInfo)
        if (msg.status === 200) {
          this.select()
        }
      }
    },
    async delete(id: number) {
      const msg = await deleteTodo('api/todo', id)
      if (msg.status === 200) {
        this.select()
      }
    }
  }
})
