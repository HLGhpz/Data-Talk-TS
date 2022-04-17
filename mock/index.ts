/*
 * @Author: HLGhpz
 * @Date: 2022-04-13 14:35:43
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-04-15 17:08:29
 * @Description: 模拟项目数据。
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
 */

import Mock from 'mockjs'

let targetList = Mock.mock({
  'todos|10-20': [
    {
      'id|+1': 1,
      title: '@cname',
      abstract: '@word(2,4)',
      'tag|1': ['Project', 'Collect', 'Make', 'Achieve', 'Pause', 'Abolish'],
      createTime: '@datetime',
      updateTime: '@datetime'
    }
  ]
})

Mock.mock('api/todo', 'get', (req, res) => {
  // 请求的方式参数为小写
  return targetList
})
