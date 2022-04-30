<!--
 * @Author: HLGhpz
 * @Date: 2022-04-21 20:44:17
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-04-28 20:17:26
 * @Description:
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
-->

<template>
  <!-- <Line></Line>
  <PictorialBar></PictorialBar> -->
  <PicBarAndLine></PicBarAndLine>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useChartDataStore } from '@/stores'
import { Line } from './line'
import { PictorialBar } from './pictorialBar'
import { PicBarAndLine } from './picBarAndLine'

import './watchDataChange'

// 图表数据
const fileName = 'CollegeGraduates'

// 全局变量
const chartDataStore = useChartDataStore()

onMounted(async () => {
  await chartDataStore.getChartData(fileName)
})
</script>

<style scoped>
.chart-wrapper {
  background-image: url(@/assets/img/backGround-blue.png);
}
</style>
