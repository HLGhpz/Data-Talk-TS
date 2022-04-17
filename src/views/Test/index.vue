<!--
 * @Author: HLGhpz
 * @Date: 2022-04-16 16:25:08
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-04-16 17:03:49
 * @Description:
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
-->

<template>
  <div>
    <h1>{{}}</h1>
  </div>
</template>


<script setup lang="ts">
import { onMounted, toRefs, ref, isRef, isReactive } from 'vue'
import { useStatuStore, useTodoInfoStore } from '@/stores'
import { storeToRefs } from 'pinia'

const TodoInfoStore = useTodoInfoStore()
const title = storeToRefs(TodoInfoStore)
</script>

