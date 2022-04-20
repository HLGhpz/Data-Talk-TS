/*
 * @Author: HLGhpz
 * @Date: 2022-04-19 19:55:17
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-04-19 20:50:02
 * @Description:
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
 */
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3030'

export function getData(path: string, fileName: string) {
  return axios.get(path, {
    params: {
      fileName
    }
  })
}
