/*
 * @Author: HLGhpz
 * @Date: 2022-07-11 17:06:14
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-07-14 17:22:37
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
  let kind = '通货膨胀率'
  let unit = _.filter(rowData, (item) => {
    return item.Country === 'Unit'
  })
  let remark = _.filter(rowData, (item) => {
    return item.Country === 'Remark'
  })
  result = _.chain(rowData)
    .filter((item) => {
      return item.Country !== 'Unit' && item.Country !== 'Remark'
    })
    .filter((item) => {
      return item.Country !== '总计' && item.Category !== 'Total'
    })
    .reverse()
    .sortBy(`${kind}Index`)
    .reverse()
    .value()

  console.log('result', result)

  return [result, unit]
}

export { handleData }
