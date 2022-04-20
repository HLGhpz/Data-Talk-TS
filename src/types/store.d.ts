/*
 * @Author: HLGhpz
 * @Date: 2022-04-16 18:09:56
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-04-20 23:25:28
 * @Description:
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
 */

import { OperationEnum, TagEnum } from '@/enums'

export interface Todo {
  readonly id: number
  title: string
  abstract: string
  tag: TagEnum | undefined
  dataLink: string | undefined
  chartLink: string | undefined
  chartType: string | undefined
  createdAt: string
  updatedAt: string
}

export interface TodoInfo {
  id?: number
  title?: string
  abstract?: string
  dataLink?: string | undefined
  chartLink?: string | undefined
  chartType?: string | undefined
  chartTypes?: Object | undefined
  tag?: TagEnum | undefined
  type: OperationEnum | undefined
}
