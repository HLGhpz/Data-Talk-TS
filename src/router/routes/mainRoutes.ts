/*
 * @Author: HLGhpz
 * @Date: 2022-04-27 15:54:07
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-04-27 16:44:18
 * @Description:
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
 */

import type { RouteRecordRaw } from 'vue-router'

/**
 * 路由配置
 * @description 所有主路由都在这里集中管理
 */
const mainRoutes: RouteRecordRaw[] = [
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home.vue'),
    meta: {
      title: 'Home'
    }
  },
  {
    path: '/todo',
    name: 'todo',
    component: () => import('@/views/TodoTable/index.vue'),
    meta: {
      title: 'TodoTable'
    }
  },
  {
    path: '/finish',
    name: 'finish',
    component: () => import('@/views/FinishTable/index.vue'),
    meta: {
      title: 'FinishTable'
    }
  }
]

export default mainRoutes
