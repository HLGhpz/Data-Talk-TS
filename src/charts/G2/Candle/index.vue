<!--
 * @Author: HLGhpz
 * @Date: 2022-05-06 20:41:55
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-05-08 16:52:15
 * @Description:
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
-->
<template>
  <div class="chart-wrapper" ref="chartDom"></div>
</template>

<script setup lang="ts">
import { Chart } from '@antv/g2'
import DataSet from '@antv/data-set'
import { useChartDataStore } from '@/stores'
import { ref, onMounted } from 'vue'

// 图表数据
const fileName = 'USD_RUB'

// 图表变量
const chartDom = ref(null)

// 全局变量
const chartDataStore = useChartDataStore()

onMounted(async () => {
  console.log('chartDom', chartDom.value)
  await chartDataStore.getChartData(fileName)
  const ds = new DataSet()
  const dv = ds.createView()
  dv.source(chartDataStore.rowData).transform({
    type: 'map',
    callback: (obj) => {
      obj.trend = obj.Open - obj.Close > 0 ? 'up' : 'down'
      obj.range = [obj.Open, obj.Close, obj.High, obj.Low]
      return obj
    }
  })

  const chart = new Chart({
    container: chartDom.value as unknown as HTMLDivElement,
    autoFit: true,
    // height: 1080,
    padding: [100, 100, 100, 100]
  })

  console.log(chart.height)
  console.log(chart.width)

  chart.data(dv.rows)

  chart.scale({
    date: {
      type: 'timeCat',
      range: [0, 1],
      tickCount: 5
    },
    trend: {
      values: ['up', 'down']
    },
    range: {
      alias: '股票价格',
      nice: true
    }
  })

  chart
    .schema()
    .position('Date*range')
    .color('trend', (val) => {
      if (val === 'up') {
        return '#f04864'
      }

      if (val === 'down') {
        return '#2fc25b'
      }
    })
    .shape('candle')

  chart.render()
})
</script>

<style scoped>
.chart-wrapper {
  background-image: url(@/assets/img/backGround-pink.png);
}
</style>
