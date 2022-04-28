<!--
 * @Author: HLGhpz
 * @Date: 2022-04-18 22:47:17
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-04-21 17:43:20
 * @Description:
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
-->
<template>
  <h1>{{ todoInfoStore.title }}</h1>
  <n-space justify="space-around" style="padding-top: 20px">
    <n-button type="error" @click="handleDelete">删除</n-button>
    <n-button @click="handleCancel">取消</n-button>
  </n-space>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { OperationEnum } from '@/enums'
import { TodoInfo } from '@/types/store'
import { useStateStore, useTodoStore, useTodoInfoStore } from '@/stores'
import { storeToRefs } from 'pinia'

const stateStore = useStateStore()
const todoInfoStore = useTodoInfoStore()
const todoStore = useTodoStore()
const { deleteModel } = storeToRefs(stateStore)

const model = ref({} as TodoInfo)

function handleDelete() {
  if (stateStore.editType == OperationEnum.Delete) {
    todoStore.delete(model.value.id as number)
  }
  deleteModel.value = false
}
function handleCancel() {
  deleteModel.value = false
}

onMounted(() => {
  model.value = todoInfoStore.$state
})
</script>
