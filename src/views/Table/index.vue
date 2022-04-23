<!--
 * @Author: HLGhpz
 * @Date: 2022-04-13 21:47:48
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-04-23 22:15:19
 * @Description:
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
-->

<template>
  <n-space vertical :size="12" class="data-table">
    <n-data-table
      :bordered="true"
      :columns="columns"
      :data="makeTodos"
      :pagination="pagination"
      class="text-wrapper"
    >
    </n-data-table>
  </n-space>
  <n-modal v-model:show="editModel" :mask-closable="false" preset="dialog">
    <info-edit />
  </n-modal>
  <n-modal v-model:show="deleteModel" :mask-closable="false" preset="dialog">
    <template #header>
      <div>是否确定删除</div>
    </template>
    <info-delete
  /></n-modal>
  <edit-ball />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
// import { selectTodo } from '@/api/crud'
import { makeColumn } from './makeConfig'
import { useStateStore, useTodoStore } from '@/stores'
import { InfoEdit, InfoDelete, EditBall } from './components'
import { storeToRefs } from 'pinia'

// const todoPath = 'api/todo'
const stateStore = useStateStore()
const todoStore = useTodoStore()
const { editModel, deleteModel } = storeToRefs(stateStore)
const { makeTodos } = storeToRefs(todoStore)
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
