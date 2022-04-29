/*
 * @Author: HLGhpz
 * @Date: 2022-04-17 13:37:14
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-04-29 11:19:35
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
    path: 'CNY_JPY',
    name: 'CNY_JPY',
    component: () => import('@/charts/CNY_JPY/index.vue'),
    meta: {
      title: 'CNY_JPY'
    }
  },
  {
    path: 'collegeGraduate',
    name: 'collegeGraduate',
    component: () => import('@/charts/collegeGraduate/index.vue'),
    meta: {
      title: 'CollegeGraduate'
    }
  },
  {
    path: 'educationBudget',
    name: 'educationBudget',
    component: () => import('@/charts/educationBudget/index.vue'),
    meta: {
      title: 'EducationBudget'
    }
  },
  {
    path: 'birthPopulation',
    name: 'birthPopulation',
    component: () => import('@/charts/birthPopulation/index.vue'),
    meta: {
      title: 'BirthPopulation'
    }
  },
  {
    path: 'nationalRead',
    name: 'nationalRead',
    component: () => import('@/charts/nationalRead/index.vue'),
    meta: {
      title: 'NationalRead'
    }
  }
]

export default chartRoutes
