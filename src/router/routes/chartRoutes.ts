/*
 * @Author: HLGhpz
 * @Date: 2022-04-17 13:37:14
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-04-30 18:39:16
 * @Description:
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
 */
import type { RouteRecordRaw } from 'vue-router'

/**
 * 路由配置
 * @description 所有路由都在这里集中管理
 */
const echartRoutes: RouteRecordRaw[] = [
  {
    path: 'CNY_JPY',
    name: 'CNY_JPY',
    component: () => import('@/charts/Echarts/CNY_JPY/index.vue'),
    meta: {
      title: 'CNY_JPY'
    }
  },
  {
    path: 'collegeGraduate',
    name: 'collegeGraduate',
    component: () => import('@/charts/Echarts/collegeGraduate/index.vue'),
    meta: {
      title: 'CollegeGraduate'
    }
  },
  {
    path: 'educationBudget',
    name: 'educationBudget',
    component: () => import('@/charts/Echarts/educationBudget/index.vue'),
    meta: {
      title: 'EducationBudget'
    }
  },
  {
    path: 'birthPopulation',
    name: 'birthPopulation',
    component: () => import('@/charts/Echarts/birthPopulation/index.vue'),
    meta: {
      title: 'BirthPopulation'
    }
  },
  {
    path: 'nationalRead',
    name: 'nationalRead',
    component: () => import('@/charts/Echarts/nationalRead/index.vue'),
    meta: {
      title: 'NationalRead'
    }
  },
  {
    path: 'provinceGDP',
    name: 'provinceGDP',
    component: () => import('@/charts/Echarts/provinceGDP/index.vue'),
    meta: {
      title: 'ProvinceGDP'
    }
  }
]

const g2Routes: RouteRecordRaw[] = []

const chartRoutes: RouteRecordRaw[] = [...echartRoutes, ...g2Routes]

export default chartRoutes
