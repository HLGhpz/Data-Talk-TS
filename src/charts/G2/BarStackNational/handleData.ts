/*
 * @Author: HLGhpz
 * @Date: 2022-06-17 17:12:06
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-07-09 18:49:36
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
  let kind = '人数'
  let unit = _.filter(rowData, (item) => {
    return item.民族 === 'Unit'
  })
  let remark = _.filter(rowData, (item) => {
    return item.民族 === 'Remark'
  })
  result = _.chain(rowData)
    .filter((item) => {
      return item.民族 !== 'Unit' && item.民族 !== 'Remark'
    })
    .filter((item) => {
      return item.民族 !== '总计' && item.Category !== 'Total'
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
