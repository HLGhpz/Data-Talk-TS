<!--
 * @Author: HLGhpz
 * @Date: 2022-04-13 21:47:48
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-04-28 10:57:17
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
import { storeToRefs } from 'pinia'

// 引入组件
import { InfoEdit, InfoDelete, EditBall } from './components'

// 引入表格
import { makeColumn } from './makeConfig'

// 引入全局变量
import { useStateStore, useTodoStore } from '@/stores'

const stateStore = useStateStore()
const todoStore = useTodoStore()
const { editModel, deleteModel } = storeToRefs(stateStore)
const { makeTodos } = storeToRefs(todoStore)
console.log('setup')
const columns = makeColumn()

const pagination = {
  pageSize: 10
}

onMounted(async () => {
  console.log('onMounted TodoTable')
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
