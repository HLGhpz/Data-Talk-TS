<!--
 * @Author: HLGhpz
 * @Date: 2022-04-20 11:19:44
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-04-20 12:08:07
 * @Description:
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
-->

<template>
  <FloatBall @click="showDataChange = !showDataChange">
    <chart-multiple20-filled />
  </FloatBall>
</template>

<script setup lang="ts">
import { FloatBall } from '@/components'
import { ChartMultiple20Filled } from '@vicons/fluent'
import { useStateStore } from '@/stores'
import { storeToRefs } from 'pinia'
const stateStore = useStateStore()
const { showDataChange } = storeToRefs(stateStore)
</script>

<style scoped></style>
