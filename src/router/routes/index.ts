/*
 * @Author: HLGhpz
 * @Date: 2022-04-07 21:36:42
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-04-12 16:10:04
 * @Description:
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
 */
import chartRoutes from './chartRoutes'

import type { RouteRecordRaw } from 'vue-router'

console.log('chartRoutes', chartRoutes)

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
    path: '/chart',
    name: 'chart',
    component: () =>
      import(/* webpackChunkName: "chart" */ '@charts/lineChart/index.vue'),
    meta: {
      title: 'Chart'
    },
    redirect: {
      name: 'lineChart'
    },
    children: [...chartRoutes]
  }
]

export default routes
