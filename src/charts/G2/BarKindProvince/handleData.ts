/*
 * @Author: HLGhpz
 * @Date: 2022-07-11 17:06:14
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-07-12 18:56:11
 * @Description:
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
 */
import _ from 'lodash'

/**
 * @description:图表的原始数据处理
 * @param {*} option
 * @return {*}
 */
function handleData(rowData: any) {
  let result = []
  let kind = '第一产业增加值占地区生产总值比重'
  let unit = _.filter(rowData, (item) => {
    return item.Province === 'Unit'
  })
  let remark = _.filter(rowData, (item) => {
    return item.Province === 'Remark'
  })
  result = _.chain(rowData)
    .filter((item) => {
      return item.Short !== undefined
    })
    .filter((item) => {
      return item.Short !== '总计' && item.Category !== 'Total'
    })
    .reverse()
    .sortBy(`${kind}Index`)
    .reverse()
    // .filter((item) => {
    //   return item.Value >= 4000000
    // })
    .value()

  console.log('result', result)

  return [result, unit]
}

export { handleData }
