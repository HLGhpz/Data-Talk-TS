import type { RouteRecordRaw } from 'vue-router'

/**
 * 路由配置
 * @description 所有路由都在这里集中管理
 */
const chartRoutes: RouteRecordRaw[] = [
  {
    path: 'lineChart',
    name: 'lineChart',
    component: () => import('@charts/lineChart/index.vue'),
    meta: {
      title: 'LineChart'
    }
  }
]

export default chartRoutes
