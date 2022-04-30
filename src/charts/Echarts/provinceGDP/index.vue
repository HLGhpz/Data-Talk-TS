<!--
 * @Author: HLGhpz
 * @Date: 2022-04-21 20:44:17
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-04-29 21:45:43
 * @Description:
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
-->

<template>
  <bar></bar>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useChartDataStore } from '@/stores'
import { bar } from './bar'

import './watchDataChange'

// 图表数据
const fileName = 'ProvinceGDP'

// 全局变量
const chartDataStore = useChartDataStore()

onMounted(async () => {
  await chartDataStore.getChartData(fileName)
})
</script>

<style scoped>
.chart-wrapper {
  background-image: url(@/assets/img/backGround-purple.png);
}
</style>
