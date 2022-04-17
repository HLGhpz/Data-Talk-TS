/*
 * @Author: HLGhpz
 * @Date: 2022-04-16 18:09:56
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-04-16 18:12:18
 * @Description:
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
 */

import { OperationEnum, TagEnum } from '@/enums'

export interface Todo {
  readonly id: number
  title: string
  abstract: string
  tag: TagEnum
  createTime: string
  updateTime: string
}

export interface TodoInfo {
  id: number
  title: string
  abstract: string
  tag: TagEnum
  type: OperationEnum
}
