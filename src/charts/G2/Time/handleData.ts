/*
 * @Author: HLGhpz
 * @Date: 2022-07-11 17:06:14
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-07-25 20:02:18
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
  let unit = _.filter(rowData, (item) => {
    return item.年份 === 'Unit'
  })
  let remark = _.filter(rowData, (item) => {
    return item.年份 === 'Remark'
  })
  result = _.chain(rowData)
    .filter((item) => {
      return item.年份 !== 'Unit' && item.年份 !== 'Remark'
    })
    // .filter((item) => {
    //   return item.Country !== '总计' && item.Category !== 'Total'
    // })
    // .reverse()
    .value()

  console.log('result', result)

  return [result, unit]
}

export { handleData }
