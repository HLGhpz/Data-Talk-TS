<!--
 * @Author: HLGhpz
 * @Date: 2022-04-21 20:44:17
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-04-23 22:36:10
 * @Description:
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
-->

<template>
  <pictorial-bar></pictorial-bar>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useChartDataStore } from '@/stores'
import pictorialBar from './pictorialBar/pictorialBar.vue'
import './watchDataChange'

// 图表数据
const fileName = 'College_Graduates'

// 全局变量
const chartDataStore = useChartDataStore()

onMounted(async () => {
  await chartDataStore.getChartData(fileName)
})
</script>

<style scoped></style>
