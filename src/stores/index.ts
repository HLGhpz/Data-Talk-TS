/*
 * @Author: HLGhpz
 * @Date: 2022-04-07 21:36:42
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-06-06 16:48:14
 * @Description:
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
 */

import { useChartDataStore } from './chart/chartData'
import { useFinishStore } from './finish/finishes'
import { useFinishInfoStore } from './finish/finishInfo'
import { useTodoStore } from './todo/todos'
import { useTodoInfoStore } from './todo/todoInfo'
import { useStateStore } from './state'
import { useStatisticalStore } from './statistical/statistical'

export {
  useChartDataStore,
  useFinishStore,
  useFinishInfoStore,
  useTodoStore,
  useTodoInfoStore,
  useStateStore,
  useStatisticalStore
}
