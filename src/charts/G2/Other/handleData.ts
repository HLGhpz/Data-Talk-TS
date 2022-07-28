/*
 * @Author: HLGhpz
 * @Date: 2022-07-11 17:06:14
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-07-27 19:05:54
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
  let kind = '序号'
  let unit = _.filter(rowData, (item) => {
    return item[`${kind}`] === 'Unit'
  })
  let remark = _.filter(rowData, (item) => {
    return item[`${kind}`] === 'Remark'
  })
  result = _.chain(rowData)
    .filter((item) => {
      return item[`${kind}`] !== 'Unit' && item[`${kind}`] !== 'Remark'
    })
    .reverse()
    .value()

  console.log('result', result)

  return [result, unit]
}

export { handleData }
