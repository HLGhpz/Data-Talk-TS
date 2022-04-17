<!--
 * @Author: HLGhpz
 * @Date: 2022-04-14 18:59:02
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-04-17 14:40:32
 * @Description: 表格编辑
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
-->
<template>
  <n-form :model="model" :rules="rules">
    <n-form-item label="任务" path="title">
      <n-input v-model:value="model.title" placeholder="任务" />
    </n-form-item>
    <n-form-item label="简介" path="abstract">
      <n-input
        v-model:value="model.abstract"
        placeholder="简介"
        type="textarea"
        :autosize="{
          minRows: 3,
          maxRows: 5
        }"
      />
    </n-form-item>

    <n-form-item label="进度" path="tag">
      <n-select v-model:value="model.tag" :options="tagOptions" />
    </n-form-item>
    <n-space justify="space-around" style="padding-top: 20px">
      <n-button
        type="primary"
        @click="handleSubmit"
        :disabled="
          model.title === '' || model.abstract === '' || model.tag === ''
        "
        >提交</n-button
      >
      <n-button @click="handleCancel">取消</n-button>
    </n-space>
  </n-form>
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
const { modelState } = storeToRefs(statuStore)

const model = ref({} as TodoInfo)

let rules = {
  title: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入 题材名称'
  },
  abstract: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入 简介'
  },
  tag: {
    required: true,
    trigger: ['blur', 'change'],
    message: '请选择 进度'
  }
}

// 遍历枚举中所有
let tagOptions = Object.keys(TagEnum)
  .filter((key) => isNaN(Number(TagEnum[key])))
  .map((key) => ({
    value: TagEnum[key],
    label: TagEnum[key]
  }))

function handleSubmit() {
  if (model.value.type == OperationEnum.Create) {
    console.log('create')
  } else if (model.value.type == OperationEnum.Update) {
    todoStore.update(model.value)
  }
  modelState.value = false
}
function handleCancel() {
  modelState.value = false
}

onMounted(() => {
  model.value = todoInfoStore.$state
})
</script>
