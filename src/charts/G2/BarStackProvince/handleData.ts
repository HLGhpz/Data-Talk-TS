/*
 * @Author: HLGhpz
 * @Date: 2022-06-17 17:12:06
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-06-21 17:42:27
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
  let unit = _.chain(rowData).last().value()
  result = _.chain(rowData)
    .dropRight()
    .reverse()
    // .filter((item) => {
    //   return _.includes(item.Category, 'Grain')
    // })
    .value()

  return [result, unit]
}

export { handleData }
