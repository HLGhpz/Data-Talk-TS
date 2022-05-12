<!--
 * @Author: HLGhpz
 * @Date: 2022-04-25 11:38:52
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-04-28 11:10:50
 * @Description:
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
-->

<template>
  <PictorialBar></PictorialBar>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useChartDataStore } from '@/stores'
import { PictorialBar } from './pictorialBar'

import './watchDataChange'

// 图表数据
const fileName = 'EducationBudget'

// 全局变量
const chartDataStore = useChartDataStore()

onMounted(async () => {
  await chartDataStore.getChartData(fileName)
})
</script>

<style scoped></style>
