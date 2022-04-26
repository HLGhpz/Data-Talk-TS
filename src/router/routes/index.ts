/*
 * @Author: HLGhpz
 * @Date: 2022-04-07 21:36:42
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-04-26 19:34:53
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
    component: () => import(/* webpackChunkName: "home" */ '@views/home.vue'),
    meta: {
      title: 'Home'
    }
  },
  {
    path: '/table',
    name: 'table',
    component: () => import('@views/Table/index.vue'),
    meta: {
      title: 'Table'
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
    path: '/chart',
    name: 'chart',
    component: () =>
      import(/* webpackChunkName: "chart" */ '@/charts/index.vue'),
    children: [...chartRoutes]
  }
]

export default routes
