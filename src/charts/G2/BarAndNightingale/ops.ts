import { Chart } from '@antv/g2'
import { useChartDataStore } from '@/stores'
import { storeToRefs } from 'pinia'
import inserCss from 'insert-css'

// 图表变量
let chart: any = null
let barView: any = null
let pieView: any = null

// 全局变量
const chartDataStore = useChartDataStore()
const { latestData } = storeToRefs(chartDataStore)

inserCss(`
  .annotation {
    position: fixed;
    bottom: 100px;
    right: 0px;
    width: 450px;
    z-index: 9999;
  }

  .annotation-img{
    width: 200px;
  }

  .annotation-flag {
    height: 90px;
    width: 120px;
  }

  .annotation-text {
    font-size: 25px;
    font-weight: bold;
    color: #c02c38;
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
    padding: [50, 20, 50, 80]
  })

  // 自定义样式
  chart.theme({
    styleSheet: {
      paletteQualitative10: [
        '#E01F54',
        '#001852',
        '#f5e8c8',
        '#b8d2c7',
        '#c6b38e',
        '#a4d8c2',
        '#f3d999',
        '#d3758f',
        '#dcc392',
        '#2e4783'
      ],
      paletteQualitative20: [
        '#E01F54',
        '#001852',
        '#f5e8c8',
        '#b8d2c7',
        '#c6b38e',
        '#a4d8c2',
        '#f3d999',
        '#d3758f',
        '#dcc392',
        '#2e4783',
        '#82b6e9',
        '#ff6347',
        '#a092f1',
        '#0a915d',
        '#eaf889',
        '#6699FF',
        '#ff6666',
        '#3cb371',
        '#d5b158',
        '#38b6b6'
      ]
    }
  })

  barView = chart.createView({
    region: {
      start: { x: 0, y: 0 },
      end: { x: 0.6, y: 1 }
    }
  })

  // 设置图表数据
  barView.data(chartDataStore.rowData)

  // 设置图表度量
  barView.scale({
    PerGDP: {
      // max: 130,
      // min: 0
    },
    City: {
      type: 'cat'
    }
  })

  barView.legend(false)

  // 设置坐标轴
  barView.coordinate().transpose()

  barView.axis('City', {
    label: {
      style: {
        fontSize: 20,
        fill: '#424242'
      }
    },
    line: null,
    tickLine: null,
    grid: null
  })

  barView.axis('PerGDP', {
    label: null,
    line: null,
    tickLine: null,
    grid: null
  })

  // 设置图表
  barView
    .interval()
    .position('City*PerGDP')
    .style({
      radius: [20, 20, 0, 0]
    })
    .size(20)
    .color('City')
    .label('PerGDP', {
      style: {
        fill: '#424242',
        fontSize: 22
      },
      content: (obj) => {
        return `${obj.PerGDP}￥- ${obj.PerGDPRank}`
      }
    })

  pieView = chart.createView({
    region: {
      start: { x: 0.6, y: 0 },
      end: { x: 1, y: 0.5 }
    }
  })

  // 设置图表数据
  pieView.data(chartDataStore.rowData)

  // 设置图表图例
  pieView.legend(false)

  // 设置坐标轴
  pieView.coordinate('polar', {
    innerRadius: 0.2
  })

  pieView.axis(false)

  // 设置图表
  pieView
    .interval()
    .position('City*PerGDP')
    .color('City')
    .style({
      lineWidth: 1,
      stroke: '#fff'
    })
    .label('City', {
      offset: -15,
      style: {
        // textBaseline: 'middle',
        fontWeight: 'bold',
        fontSize: 14,
        fill: '#fff'
      },
      content: (obj) => {
        return `${obj.City}`
      },
      layout: {
        type: 'limit-in-shape'
      }
    })

  chart.legend(false)
  chart.render()
}

/**
 * @description:图表的数据更新
 * @param {*} option
 * @return {*}
 */
function updateChart() {
  chart.annotation().clear(true)

  const annotation = document.getElementById('annotation')
  const annotationData = latestData.value

  annotation.innerHTML = `
  <div class="annotation">
  <p>
    <img class="annotation-img" src="../src/assets/province/${annotationData.Province}.png"></img>
  </p>
  <P class="annotation-text">${annotationData.City}</P>
  <P class="annotation-text">人均GDP：${annotationData.PerGDP}</P>
  <P class="annotation-text">${annotationData.Province}排名：${annotationData.ProPerIndex}</P>
  <P class="annotation-text">全国排名：${annotationData.PerGDPRank}</P>
  </div>
  `

  // // 设置辅助标注
  // chart.annotation().text({
  //   position: ['50%', '85%'],
  //   content: `${latestData.value.Zh}：${latestData.value.DefenseSpend}＄`,
  //   style: {
  //     fontSize: 50,
  //     fill: '#8b8b8b'
  //   }
  // })

  // 数据配置
  barView.changeData(chartDataStore.startToEndData)
  pieView.changeData(chartDataStore.startToEndData)
  // chart.changeData(chartDataStore.startToEndData)
}

export { initChart, updateChart }
