/*
 * @Author: HLGhpz
 * @Date: 2022-04-07 21:36:42
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-04-27 22:45:51
 * @Description:
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
 */
import { defineStore } from 'pinia'
import { selectTodo, updateTodo, createTodo, deleteTodo } from '@/api/crud'
import { Todo, TodoInfo } from '@/types/store'

export const useTodoStore = defineStore('todos', {
  state: () => ({
    todos: [] as Todo[]
  }),
  getters: {
    makeTodos(state) {
      return state.todos.filter((todo: Todo) =>
        ['Project', 'Collect', 'Make', 'Pause'].includes(
          todo.tag as unknown as string
        )
      )
    },
    finishedTodos(state) {
      return state.todos.filter((todo: Todo) =>
        ['Achieve', 'Abolish'].includes(todo.tag as unknown as string)
      )
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
