<!--
 * @Author: HLGhpz
 * @Date: 2022-04-14 18:59:02
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-04-23 22:18:41
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
          minRows: 2,
          maxRows: 3
        }"
      />
    </n-form-item>
    <n-form-item label="数据来源">
      <n-input
        v-model:value="model.dataLink"
        placeholder="数据来源"
        type="textarea"
        :autosize="{
          minRows: 2,
          maxRows: 3
        }"
      />
    </n-form-item>
    <n-form-item label="数据类型">
      <n-select
        v-model:value="model.dataType"
        placeholder="数据类型"
        :options="dataOptions"
      />
    </n-form-item>
    <n-form-item label="图表类型">
      <n-select
        v-model:value="model.chartTypes"
        placeholder="图表类型"
        :options="chartOptions"
        multiple
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
import { TagEnum, ChartTypeEnum, OperationEnum, DataTypeEnum } from '@/enums'
import { TodoInfo } from '@/types/store'
import { useStateStore, useTodoStore, useTodoInfoStore } from '@/stores'
import { storeToRefs } from 'pinia'

const stateStore = useStateStore()
const todoInfoStore = useTodoInfoStore()
const todoStore = useTodoStore()
const { editModel } = storeToRefs(stateStore)

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

let chartOptions = Object.keys(ChartTypeEnum)
  .filter((key) => isNaN(Number(ChartTypeEnum[key])))
  .map((key) => ({
    value: ChartTypeEnum[key],
    label: ChartTypeEnum[key]
  }))

let dataOptions = Object.keys(DataTypeEnum)
  .filter((key) => isNaN(Number(DataTypeEnum[key])))
  .map((key) => ({
    value: DataTypeEnum[key],
    label: DataTypeEnum[key]
  }))

function handleSubmit() {
  model.value.chartType = model.value.chartTypes?.join('&') as string
  if (stateStore.editType === OperationEnum.Create) {
    todoStore.create(model.value)
  } else if (stateStore.editType == OperationEnum.Update) {
    todoStore.update(model.value)
  }
  editModel.value = false
}

function handleCancel() {
  editModel.value = false
}

onMounted(() => {
  model.value = todoInfoStore.$state
})
</script>
