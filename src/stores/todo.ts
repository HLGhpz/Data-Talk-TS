/*
 * @Author: HLGhpz
 * @Date: 2022-04-07 21:36:42
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-04-17 14:47:13
 * @Description:
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
 */
import { defineStore } from 'pinia'
import { selectTodo } from '@/api/crud'
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
    async select() {
      const todoList = await selectTodo('api/todo')
      const todos = todoList.data.todos
      this.todos = todos
    },
    async update(todoInfo: TodoInfo) {
      const todo = this.todos.find((todo: Todo) => todo.id === todoInfo.id)
      todo.title = todoInfo.title
      todo.abstract = todoInfo.abstract
      todo.tag = todoInfo.tag
    }
  }
})
