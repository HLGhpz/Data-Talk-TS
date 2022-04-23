/*
 * @Author: HLGhpz
 * @Date: 2022-04-17 13:37:14
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-04-23 21:22:14
 * @Description:
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
 */
import type { RouteRecordRaw } from 'vue-router'

/**
 * 路由配置
 * @description 所有路由都在这里集中管理
 */
const chartRoutes: RouteRecordRaw[] = [
  {
    path: 'lineChart',
    name: 'lineChart',
    component: () => import('@/charts/lineChart/index.vue'),
    meta: {
      title: 'LineChart'
    }
  },
  {
    path: 'candleStick',
    name: 'candleStick',
    component: () => import('@/charts/candleStick/index.vue'),
    meta: {
      title: 'CandleStick'
    }
  },
  {
    path: 'collegeGraduate',
    name: 'collegeGraduate',
    component: () => import('@/charts/collegeGraduate/index.vue'),
    meta: {
      title: 'collegeGraduate'
    }
  }
]

export default chartRoutes
