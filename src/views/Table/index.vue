<!--
 * @Author: HLGhpz
 * @Date: 2022-04-13 21:47:48
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-04-15 17:34:58
 * @Description:
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
-->

<template>
  <n-space vertical :size="12" class="data-table">
    <n-data-table
      :bordered="true"
      :columns="columns"
      :data="todos"
      :pagination="pagination"
    >
    </n-data-table>
  </n-space>
  <n-modal v-model:show="modelState" :mask-closable="false" preset="dialog">
    <table-edit />
  </n-modal>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
// import { selectTodo } from '@/api/crud'
import { createColumn } from './columnConfig'
import { useStatuStore, useTodoStore } from '@/stores'
import { TableEdit } from './components'
import { storeToRefs } from 'pinia'

// const todoPath = 'api/todo'
const statuStore = useStatuStore()
const todoStore = useTodoStore()
const { modelState } = storeToRefs(statuStore)
const { todos } = storeToRefs(todoStore)
const columns = createColumn(modelState)

const pagination = {
  pageSize: 10
}

onMounted(async () => {
  await todoStore.select()
})
</script>

<style scoped>
.data-table {
  padding: 24px 24px 24px 24px;
}
</style>
