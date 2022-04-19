<!--
 * @Author: HLGhpz
 * @Date: 2022-04-18 21:56:30
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-04-19 11:17:16
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
import { useStatuStore, useTodoInfoStore } from '@/stores'
import { OperationEnum } from '@/enums'

function showModal() {
  const statuStore = useStatuStore()
  const todoInfoStore = useTodoInfoStore()
  statuStore.editModel = true
  todoInfoStore.$state = {
    title: '',
    abstract: '',
    tag: undefined,
    type: OperationEnum.Create
  }
}
</script>

<style scoped></style>
