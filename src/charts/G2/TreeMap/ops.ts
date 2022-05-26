import { Chart } from '@antv/g2'
import { DataSet } from '@antv/data-set'
import { useChartDataStore } from '@/stores'
import { storeToRefs } from 'pinia'
import inserCss from 'insert-css'
import { Shape } from '.pnpm/registry.npmmirror.com+@antv+attr@0.3.3/node_modules/@antv/attr'

// 图表变量
let chart: any = null

// 全局变量
const chartDataStore = useChartDataStore()
const { latestData } = storeToRefs(chartDataStore)

inserCss(`
  .annotation {
    position: fixed;
    top: 300px;
    right: 50px;
    width: 300px;
    z-index: 9999;
  }

  .annotation-img{
    width: 200px;
  }

  .annotation-flag {
    height: 90px;
    width: 120px;
    color: #757575;
  }

  .annotation-text {
    font-size: 25px;
    color: #757575;
  }
`)

/**
 * @description:初始化图表
 * @param {*} option
 * @return {*}
 */
function initChart() {
  chart = new Chart({
    container: 'chartDom',
    autoFit: true,
    padding: [100, 400, 50, 50]
  })

  // 设置图表数据
  chart.data(handleData(chartDataStore.rowData))

  // 设置图表度量
  chart.scale({
    x: {
      nice: true
    },
    y: {
      nice: true
    }
  })

  // 设置图表图例
  chart.legend(false)

  chart.axis(false)

  // 设置图表
  chart
    .polygon()
    .position('x*y')
    .color('name')
    .style({
      lineWidth: 1,
      stroke: '#fff'
    })
    .label('name', {
      offset: 0,
      style: {
        textBaseline: 'middle',
        fontSize: 22,
        fill: '#424242'
      },
      content: (obj) => {
        console.log(obj)
        return `${obj.name}：${obj.value}`
      },
      layout: {
        type: 'fixed-overlap'
      }
    })

  chart.render()
}

/**
 * @description:图表的数据更新
 * @param {*} option
 * @return {*}
 */
function updateChart() {
  // // 清除辅助标注
  chart.annotation().clear(true)

  const annotation = document.getElementById('annotation')
  const annotationData = latestData.value
  let color = '#fff'
  if (annotationData.Incremental > 0) {
    color = '#f04864'
  } else if (annotationData.Incremental < 0) {
    color = '#2fc25b'
  } else {
    color = '#757575'
  }
  annotation.innerHTML = `
  <div class="annotation">
  <p>
    <img class="annotation-img" src="../src/assets/province/${annotationData.Province}.png"></img>
  </p>
  <P class="annotation-text">${annotationData.Province}</P>
  <P class="annotation-text">2021年常住人口：${annotationData['2021Year']}万</P>
  <P class="annotation-text">2020年常住人口：${annotationData['2020Year']}万</P>
  <P class="annotation-text" style="color:${color}">人数变动：${annotationData.Incremental}万</P>
  <P class="annotation-text">排名：${annotationData.Index}</P>
  </div>
  `
  // 数据配置
  chart.changeData(handleData(chartDataStore.zeroToEndData))
}

/**
 * @description:图表的数据处理
 * @param {*} option
 * @return {*}
 */
function handleData(rowData: any) {
  const treeSet = new DataSet()
  const treeView = treeSet.createView().source(rowData)
  treeView.transform({
    type: 'pick',
    fields: ['Province', '2021Year']
  })
  const treeData = {
    name: 'root',
    children: treeView.rows
  }
  const ds = new DataSet()
  const dv = ds
    .createView()
    .source(treeData, {
      type: 'hierarchy'
    })
    .transform({
      field: '2021Year',
      type: 'hierarchy.treemap',
      tile: 'treemapResquarify',
      as: ['x', 'y']
    })
  const nodes = []
  for (const node of dv.getAllNodes()) {
    if (node.data.name === 'root') {
      continue
    }
    const eachNode = {
      name: node.data.Province,
      x: node.x,
      y: node.y,
      value: node.data['2021Year']
    }
    nodes.push(eachNode)
  }
  console.log('nodes', nodes)
  return nodes
}

export { initChart, updateChart }
