/*
 * @Author: HLGhpz
 * @Date: 2022-04-16 18:09:56
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-04-21 17:39:37
 * @Description:
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
 */

import { TagEnum, ChartTypeEnum, DataTypeEnum } from '@/enums'

export interface Todo {
  readonly id: number
  title: string
  abstract: string
  tag: TagEnum | undefined
  dataLink: string | undefined
  dataType: DataTypeEnum | undefined
  chartLink: string | undefined
  chartType: string | undefined
  createdAt: string
  updatedAt: string
}

export interface TodoInfo {
  id?: number
  title?: string
  abstract?: string
  tag?: TagEnum | undefined
  dataLink?: string | undefined
  dataType?: DataTypeEnum | undefined
  chartLink?: string | undefined
  chartType?: string | undefined
  chartTypes?: ChartTypeEnum[] | undefined
}
