/*
 * @Author: HLGhpz
 * @Date: 2022-04-19 18:25:53
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-04-27 21:11:00
 * @Description:
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
 */

import { h } from 'vue'
import { NTag } from 'naive-ui'
import { Icon } from '@/components'
import { Todo } from '@/types/store'
import { TagColorEnum, OperationEnum, ChartTypeEnum } from '@/enums'
import { useTodoInfoStore, useStateStore } from '@/stores'
import dayjs from 'dayjs'

import { Coin, Like, Star } from '@/assets/icons'

const todoInfoStore = useTodoInfoStore()
const stateStore = useStateStore()

const makeColumn = () => {
  return [
    {
      title: 'ID',
      key: 'id',
      render(row: Todo) {
        return h('h3', {}, { default: () => row.id })
      }
    },
    {
      title: '标题',
      key: 'title'
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
      title: '完成时间',
      key: 'updatedAt',
      sorter: (a: Todo, b: Todo) =>
        new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime(),
      render(row: Todo) {
        return h(
          'h3',
          {},
          { default: () => dayjs(row.updatedAt).format('YY-MM-DD') }
        )
      }
    },
    {
      key: 'like',
      title(column) {
        return h(
          'img',
          {
            src: Like,
            color: 'rgb(0,181,229)',
            height: 20
          },
          {}
        )
      }
    },
    {
      key: 'coin',
      title(column) {
        return h(
          'img',
          {
            src: Coin,
            color: 'rgb(0,181,229)',
            height: 20
          },
          {}
        )
      }
    },
    {
      key: 'star',
      title(column) {
        return h(
          'img',
          {
            src: Star,
            color: 'rgb(0,181,229)',
            height: 20
          },
          {}
        )
      }
    },
    {
      title: '编辑',
      key: 'action',
      render(row: Todo) {
        return h(
          Icon,
          {
            size: '25',
            type: 'NoteEdit',
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
          {}
        )
      }
    }
  ]
}

export { makeColumn }
