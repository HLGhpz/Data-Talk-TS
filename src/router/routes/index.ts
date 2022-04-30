/*
 * @Author: HLGhpz
 * @Date: 2022-04-07 21:36:42
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-04-30 23:08:10
 * @Description:
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
 */
import chartRoutes from './chartRoutes'

import type { RouteRecordRaw } from 'vue-router'

/**
 * 路由配置
 * @description 所有路由都在这里集中管理
 */
const routes: RouteRecordRaw[] = [
  /**
   * 首页
   */
  {
    path: '/',
    name: 'home',
    component: () => import('@views/home.vue'),
    meta: {
      title: 'Home'
    }
  },
  {
    path: '/animation',
    name: 'animation',
    component: () => import('@views/Animation/index.vue'),
    meta: {
      title: 'Animation'
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
  },
  {
    path: '/chart',
    name: 'chart',
    component: () =>
      import(/* webpackChunkName: "chart" */ '@/charts/index.vue'),
    children: [...chartRoutes]
  }
]

export default routes
