<!--
 * @Author: HLGhpz
 * @Date: 2022-05-02 15:41:52
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-05-02 15:46:43
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
const fileName = 'AsisExport'

// 全局变量
const chartDataStore = useChartDataStore()

onMounted(async () => {
  await chartDataStore.getChartData(fileName)
})
</script>

<style scoped></style>
