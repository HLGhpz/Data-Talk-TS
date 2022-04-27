<!--
 * @Author: HLGhpz
 * @Date: 2022-04-13 21:47:48
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-04-27 22:22:37
 * @Description:
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
-->

<template>
  <n-space vertical :size="12" class="data-table">
    <n-data-table
      :bordered="true"
      :columns="columns"
      :data="finishedTodos"
      :pagination="pagination"
      class="text-wrapper"
    >
    </n-data-table>
  </n-space>
  <n-modal v-model:show="editModel" :mask-closable="false" preset="dialog">
    <info-edit />
  </n-modal>
  <edit-ball />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
// import { selectTodo } from '@/api/crud'
import { makeColumn } from './finishedConfig'
import { useStateStore, useTodoStore } from '@/stores'
import { InfoEdit, EditBall } from './components'
import { storeToRefs } from 'pinia'

// const todoPath = 'api/todo'
const stateStore = useStateStore()
const todoStore = useTodoStore()
const { editModel } = storeToRefs(stateStore)
const { finishedTodos } = storeToRefs(todoStore)
const columns = makeColumn()

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

.text-wrapper {
  white-space: pre-wrap;
}
</style>
