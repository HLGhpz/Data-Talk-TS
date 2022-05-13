import DataSet from '@antv/data-set'

/**
 * @description:图表的原始数据处理
 * @param {*} option
 * @return {*}
 */
function handleData(rowData: any) {
  const ds = new DataSet()
  const dv = ds.createView().source(rowData)
  dv.transform({
    type: 'reverse'
  }).transform({
    type: 'filter',
    callback: (obj) => {
      return obj.Index <= 100
    }
  })
  return dv.rows
}

export { handleData }
