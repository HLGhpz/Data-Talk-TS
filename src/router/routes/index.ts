/*
 * @Author: HLGhpz
 * @Date: 2022-04-07 21:36:42
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-04-27 17:28:51
 * @Description:
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
 */
import chartRoutes from './chartRoutes'
import mainRoutes from './mainRoutes'

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
    name: 'layout',
    component: () => import('@/layout/index.vue'),
    children: [...mainRoutes],
    redirect: '/home'
  },
  {
    path: '/chart',
    name: 'chart',
    component: () =>
      import(/* webpackChunkName: "chart" */ '@/charts/index.vue'),
    children: [...chartRoutes]
  },
  {
    path: '/animation',
    name: 'animation',
    component: () => import('@/views/Animation/index.vue')
  }
]

export default routes
