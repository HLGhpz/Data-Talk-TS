<!--
 * @Author: HLGhpz
 * @Date: 2022-04-13 21:47:48
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-04-30 23:10:13
 * @Description:
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
-->

<template>
  <Header></Header>
  <n-space vertical :size="12" class="data-table">
    <n-data-table
      :bordered="true"
      :columns="columns"
      :data="finishes"
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
// 引入函数
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'

// 引入组件
import { InfoEdit, EditBall } from './components'
import { Header } from '@/components'

// 引入表格数据
import { makeColumn } from './finishedConfig'

// 引入全局变量
import { useFinishStore, useStateStore } from '@/stores'

const stateStore = useStateStore()
const { editModel } = storeToRefs(stateStore)

const finishStore = useFinishStore()
const { finishes } = storeToRefs(finishStore)

const columns = makeColumn()

const pagination = {
  pageSize: 10
}

onMounted(async () => {
  await finishStore.select()
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
