<!--
 * @Author: HLGhpz
 * @Date: 2022-04-18 21:56:30
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-04-21 17:30:03
 * @Description:
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
-->

<template>
  <float-ball @click="showModal">
    <apps28-regular />
  </float-ball>
</template>

<script setup lang="ts">
import { FloatBall } from '@/components'
import { Apps28Regular } from '@vicons/fluent'
import { useStateStore, useTodoInfoStore } from '@/stores'
import { OperationEnum } from '@/enums'

function showModal() {
  const stateStore = useStateStore()
  const todoInfoStore = useTodoInfoStore()
  stateStore.editModel = true
  stateStore.editType = OperationEnum.Create
  todoInfoStore.$reset()
}
</script>

<style scoped></style>
