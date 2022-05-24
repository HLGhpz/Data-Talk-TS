/*
 * @Author: HLGhpz
 * @Date: 2022-04-19 18:25:53
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-05-24 18:46:45
 * @Description:
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
 */

// 引入函数
import dayjs from 'dayjs'
import { h } from 'vue'

// 引入组件
import { NTag } from 'naive-ui'
import { Icon } from '@/components'

// 引入数据
import { Finish } from '@/types/store'
import { TagColorEnum, OperationEnum, ChartTypeEnum } from '@/enums'
import { useFinishInfoStore, useStateStore } from '@/stores'

// 引入图标
import { Coin, Like, Star } from '@/assets/icons'

const finishInfoStore = useFinishInfoStore()
const stateStore = useStateStore()

function makeColumn() {
  return [
    {
      title: 'ID',
      key: 'id',
      width: '5%',
      render(row: Finish) {
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
      render(row: Finish) {
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
      render(row: Finish) {
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
      render(row: Finish) {
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
      key: 'createdAt',
      sorter: (a: Finish, b: Finish) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      render(row: Finish) {
        return h(
          'h3',
          {},
          { default: () => dayjs(row.createdAt).format('YY-MM-DD') }
        )
      }
    },
    {
      title: '制作时长',
      key: 'createDays',
      sorter: (a: Finish, b: Finish) =>
        new Date(a.createDays).getTime() - new Date(b.createDays).getTime(),
      render(row: Finish) {
        return h(
          'span',
          {
            style: {
              'text-align': 'center'
            }
          },
          { default: () => row.createDays }
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
      render(row: Finish) {
        if ((row.tag as any) === 'Achieve') {
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
                finishInfoStore.$state = {
                  id: row.id,
                  title: row.title,
                  like: row.like,
                  coin: row.coin,
                  star: row.star,
                  note: row.note
                }
              }
            },
            {}
          )
        } else if ((row.tag as any) === 'Abolish') {
          return h(
            Icon,
            {
              size: '25',
              type: 'Stop'
            },
            {}
          )
        }
      }
    }
  ]
}

export { makeColumn }
