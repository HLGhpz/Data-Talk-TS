/*
 * @Author: HLGhpz
 * @Date: 2022-04-13 14:14:40
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-06-06 16:38:39
 * @Description: 显示数据的增删改查 API
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
 */

import axios from 'axios'
import { TodoInfo } from '@/types/store'

axios.defaults.baseURL = 'Http://localhost:3030'

export function createTodo(path: string, todoInfo: TodoInfo) {
  return axios.post(path, todoInfo)
}

export function selectTodo(path: string, param: object) {
  return axios.get(path, {
    params: param
  })
}

export function updateTodo(path: string, todoInfo: TodoInfo) {
  return axios.put(path, todoInfo)
}

export function deleteTodo(path: string, id: number) {
  return axios.delete(path, {
    params: {
      id
    }
  })
}
