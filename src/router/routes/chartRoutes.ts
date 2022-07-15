/*
 * @Author: HLGhpz
 * @Date: 2022-04-17 13:37:14
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-07-14 17:02:59
 * @Description:
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
 */
import type { RouteRecordRaw } from 'vue-router'

/**
 * 路由配置
 * @description 所有路由都在这里集中管理
 */
export const echartRoutes: RouteRecordRaw[] = [
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

export const g2Routes: RouteRecordRaw[] = [
  {
    path: 'candle',
    name: 'candle',
    component: () => import('@/charts/G2/Candle/index.vue'),
    meta: {
      title: 'Candle'
    }
  },
  {
    path: 'bar',
    name: 'bar',
    component: () => import('@/charts/G2/Bar/index.vue'),
    meta: {
      title: 'Bar'
    }
  },
  {
    path: 'barStack',
    name: 'barStack',
    component: () => import('@/charts/G2/BarStack/index.vue'),
    meta: {
      title: 'BarStack'
    }
  },
  {
    path: 'barStackProvince',
    name: 'barStackProvince',
    component: () => import('@/charts/G2/BarStackProvince/index.vue'),
    meta: {
      title: 'BarStackProvince'
    }
  },
  {
    path: 'barKindProvince',
    name: 'barKindProvince',
    component: () => import('@/charts/G2/BarKindProvince/index.vue'),
    meta: {
      title: 'BarKindProvince'
    }
  },
  {
    path: 'barStackNational',
    name: 'barStackNational',
    component: () => import('@/charts/G2/BarStackNational/index.vue'),
    meta: {
      title: 'BarStackNational'
    }
  },
  {
    path: 'barStackTime',
    name: 'barStackTime',
    component: () => import('@/charts/G2/BarStackTime/index.vue'),
    meta: {
      title: 'BarStackTime'
    }
  },
  {
    path: 'barStackAndDotProvince',
    name: 'barStackAndDotProvince',
    component: () => import('@/charts/G2/BarStackAndDotProvince/index.vue'),
    meta: {
      title: 'BarStackAndDotProvince'
    }
  },
  {
    path: 'barStackFace',
    name: 'barStackFace',
    component: () => import('@/charts/G2/BarStackFace/index.vue'),
    meta: {
      title: 'BarStackFace'
    }
  },
  {
    path: 'country',
    name: 'country',
    component: () => import('@/charts/G2/Country/index.vue'),
    meta: {
      title: 'Country'
    }
  },
  {
    path: 'lineKindTime',
    name: 'lineKindTime',
    component: () => import('@/charts/G2/LineKindTime/index.vue'),
    meta: {
      title: 'lineKindTime'
    }
  },
  {
    path: 'ohlc',
    name: 'ohlc',
    component: () => import('@/charts/G2/OHLC/index.vue'),
    meta: {
      title: 'OHLC'
    }
  },
  {
    path: 'calendar',
    name: 'calendar',
    component: () => import('@/charts/G2/Calendar/index.vue'),
    meta: {
      title: 'Calendar'
    }
  },
  {
    path: 'treeMap',
    name: 'treeMap',
    component: () => import('@/charts/G2/TreeMap/index.vue'),
    meta: {
      title: 'TreeMap'
    }
  },
  {
    path: 'nightingale',
    name: 'nightingale',
    component: () => import('@/charts/G2/BarAndNightingale/index.vue'),
    meta: {
      title: 'Nightingale'
    }
  },
  {
    path: 'barAndNightingale',
    name: 'barAndNightingale',
    component: () => import('@/charts/G2/BarAndNightingale/index.vue'),
    meta: {
      title: 'BarAndNightingale'
    }
  },
  {
    path: 'dynamicBar',
    name: 'dynamicBar',
    component: () => import('@/charts/G2/DynamicBar/index.vue'),
    meta: {
      title: 'DynamicBar'
    }
  },
  {
    path: 'dynamicStackBar',
    name: 'dynamicStackBar',
    component: () => import('@/charts/G2/DynamicStackBar/index.vue'),
    meta: {
      title: 'DynamicStackBar'
    }
  },
  {
    path: 'lineAndBar',
    name: 'lineAndBar',
    component: () => import('@/charts/G2/LineAndBar/index.vue'),
    meta: {
      title: 'LineAndBar'
    }
  }
]

export const animationRoutes: RouteRecordRaw[] = [
  {
    path: 'card',
    name: 'card',
    component: () => import('@/charts/Animation/Card/index.vue'),
    meta: {
      title: 'Card'
    }
  }
]
