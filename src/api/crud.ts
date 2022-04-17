/*
 * @Author: HLGhpz
 * @Date: 2022-04-13 14:14:40
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-04-13 20:46:38
 * @Description: 显示数据的增删改查 API
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
 */

import axios from 'axios'

// axios.defaults.baseURL = 'Http://localhost:3000'

export function selectTodo(path: string) {
  return axios.get(path)
}
