/*
 * @Author: HLGhpz
 * @Date: 2022-04-07 21:36:42
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-04-19 11:19:36
 * @Description:
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
 */
import { defineStore } from 'pinia'
import { selectTodo, updateTodo, createTodo, deleteTodo } from '@/api/crud'
import { TagEnum } from '@/enums'
import { Todo, TodoInfo } from '@/types/store'

export const useTodoStore = defineStore('todos', {
  state: () => ({
    todos: [] as Todo[]
  }),
  getters: {
    finishedTodos(state) {
      return state.todos.filter((todo: Todo) => todo.tag === TagEnum.Achieve)
    }
  },
  actions: {
    async create(todoInfo: TodoInfo) {
      const msg = await createTodo('api/todo', todoInfo)
      this.$state.todos.push(msg.data)
    },
    async select() {
      const todoList = await selectTodo('api/todo')
      const todos = todoList.data
      this.todos = todos
    },
    async update(todoInfo: TodoInfo) {
      const msg = await updateTodo('api/todo', todoInfo)
      if (msg.status === 200) {
        this.select()
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
