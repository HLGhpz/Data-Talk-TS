/*
 * @Author: HLGhpz
 * @Date: 2022-04-14 15:54:49
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-04-18 23:11:43
 * @Description:
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
 */

import { h } from 'vue'
import { NTag, NIcon } from 'naive-ui'
import { NotepadEdit20Regular } from '@vicons/fluent'
import { TagEnum, TagColorEnum, OperationEnum } from '@/enums'
import { useTodoInfoStore, useStatuStore } from '@/stores'

const todoInfoStore = useTodoInfoStore()
const stateStore = useStatuStore()

const createColumn = () => {
  return [
    {
      title: 'ID',
      key: 'id',
      render(row) {
        return h(
          'h3',
          {
            ondblclick: (res) => {
              stateStore.onStatu('deleteModel')
              todoInfoStore.$state = {
                id: row.id,
                title: row.title,
                type: OperationEnum.Delete
              }
            }
          },
          { default: () => row.id }
        )
      }
    },
    {
      title: '标题',
      key: 'title'
    },
    {
      title: '简介',
      key: 'abstract'
    },
    {
      title: '进度',
      key: 'tag',
      sorter: (a, b) => TagEnum[a.tag] - TagEnum[b.tag],
      render(row) {
        return h(
          NTag,
          {
            bordered: true,
            style: {
              backgroundColor: TagColorEnum[row.tag],
              color: '#000'
            },
            round: true
          },
          { default: () => row.tag }
        )
      }
    },
    {
      title: '更新时间',
      key: 'updatedAt',
      sorter: (a, b) =>
        new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
    },
    {
      title: '修改',
      key: 'action',
      render(row) {
        return h(
          NIcon,
          {
            size: '25',
            style: {
              cursor: 'pointer'
            },
            onClick: (res) => {
              stateStore.onStatu('editModel')
              todoInfoStore.$state = {
                id: row.id,
                title: row.title,
                abstract: row.abstract,
                tag: row.tag,
                type: OperationEnum.Update
              }
            }
          },
          { default: () => h(NotepadEdit20Regular) }
        )
      }
    }
  ]
}

export { createColumn }
