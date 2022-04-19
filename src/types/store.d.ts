/*
 * @Author: HLGhpz
 * @Date: 2022-04-16 18:09:56
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-04-18 23:12:22
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
  createdAt: string
  updateAt: string
}

export interface TodoInfo {
  id?: number
  title?: string
  abstract?: string
  tag?: TagEnum | undefined
  type: OperationEnum | undefined
}
