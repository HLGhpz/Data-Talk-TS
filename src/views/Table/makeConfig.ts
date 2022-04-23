/*
 * @Author: HLGhpz
 * @Date: 2022-04-14 15:54:49
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-04-23 22:17:25
 * @Description:
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
 */

import { h } from 'vue'
import { NTag, NIcon } from 'naive-ui'
import dayjs from 'dayjs'
import { NotepadEdit20Regular } from '@vicons/fluent'
import { Todo } from '@/types/store'
import { TagColorEnum, OperationEnum, ChartTypeEnum } from '@/enums'
import { useTodoInfoStore, useStateStore } from '@/stores'

const todoInfoStore = useTodoInfoStore()
const stateStore = useStateStore()

const makeColumn = () => {
  return [
    {
      title: 'ID',
      key: 'id',
      render(row: Todo) {
        return h(
          'h3',
          {
            ondblclick: () => {
              stateStore.deleteModel = true
              stateStore.editType = OperationEnum.Delete
              todoInfoStore.$state = {
                id: row.id,
                title: row.title
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
      key: 'abstract',
      width: '25%'
    },
    {
      title: '数据来源',
      key: 'dataLink',
      render(row: Todo) {
        const dataLinks = row.dataLink?.split('\n').map((link) => {
          return h(
            'a',
            {
              href: link,
              target: '_blank',
              style: {
                display: 'block'
              }
            },
            { default: () => link }
          )
        })
        return dataLinks
      }
    },
    {
      title: '数据类型',
      key: 'dataType',
      render(row: Todo) {
        return h(
          NTag,
          {
            bordered: true,
            round: true
          },
          { default: () => row.dataType }
        )
      }
    },
    {
      title: '图表类型',
      key: 'chartType',
      render(row: Todo) {
        const chartTypes = row.chartType?.split('&').map((type) => {
          return h(
            NTag,
            {
              style: {
                marginRight: '5px'
              },
              type: 'info'
            },
            {
              default: () => type
            }
          )
        })
        return chartTypes
      }
    },

    {
      title: '进度',
      key: 'tag',
      // sorter: (a, b) => TagEnum[a.tag] - TagEnum[b.tag],
      render(row: Todo) {
        return h(
          NTag,
          {
            bordered: true,
            style: {
              backgroundColor: TagColorEnum[row.tag as number],
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
      sorter: (a: Todo, b: Todo) =>
        new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime(),
      render(row: Todo) {
        return h(
          'h3',
          {},
          { default: () => dayjs(row.updatedAt).format('YY-MM-DD HH:mm') }
        )
      }
    },
    {
      title: '创建天数',
      key: 'createdDays',
      sorter: (a: Todo, b: Todo) => dayjs(a.createdAt).diff(dayjs(b.createdAt)),
      render(row: Todo) {
        return h(
          'h3',
          {},
          { default: () => dayjs().diff(row.createdAt, 'day') + 1 }
        )
      }
    },
    {
      title: '编辑',
      key: 'action',
      render(row: Todo) {
        return h(
          NIcon,
          {
            size: '25',
            style: {
              cursor: 'pointer'
            },
            onClick: () => {
              stateStore.editModel = true
              stateStore.editType = OperationEnum.Update
              todoInfoStore.$state = {
                id: row.id,
                title: row.title,
                abstract: row.abstract,
                dataLink: row.dataLink,
                dataType: row.dataType,
                chartLink: row.chartLink,
                chartTypes: row.chartType?.split(
                  '&'
                ) as unknown as ChartTypeEnum[],
                tag: row.tag
              }
            }
          },
          { default: () => h(NotepadEdit20Regular) }
        )
      }
    }
  ]
}

export { makeColumn }
