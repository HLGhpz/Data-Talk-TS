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
