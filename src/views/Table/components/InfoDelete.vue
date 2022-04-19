<template>
  <h1>{{ todoInfoStore.title }}</h1>
  <n-space justify="space-around" style="padding-top: 20px">
    <n-button type="error" @click="handleDelete">删除</n-button>
    <n-button @click="handleCancel">取消</n-button>
  </n-space>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { TagEnum, OperationEnum } from '@/enums'
import { TodoInfo } from '@/types/store'
import { useStatuStore, useTodoStore, useTodoInfoStore } from '@/stores'
import { storeToRefs } from 'pinia'

const statuStore = useStatuStore()
const todoInfoStore = useTodoInfoStore()
const todoStore = useTodoStore()
const { deleteModel } = storeToRefs(statuStore)

const model = ref({} as TodoInfo)

function handleDelete() {
  if (model.value.type == OperationEnum.Delete) {
    todoStore.delete(model.value.id)
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
