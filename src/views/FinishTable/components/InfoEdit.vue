<!--
 * @Author: HLGhpz
 * @Date: 2022-04-14 18:59:02
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-04-30 23:10:33
 * @Description: 表格编辑
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
-->
<template>
  <n-form :model="model" :rules="rules">
    <n-form-item label="任务" path="title">
      <n-input v-model:value="model.title" placeholder="任务" disabled />
    </n-form-item>
    <n-form-item label="备注">
      <n-input
        v-model:value="model.note"
        placeholder="请输入备注"
        type="textarea"
        :autosize="{
          minRows: 2,
          maxRows: 3
        }"
      />
    </n-form-item>
    <n-form-item label="点赞" path="like">
      <n-input-number v-model:value="model.like" placeholder="点赞" />
    </n-form-item>
    <n-form-item label="投币" path="coin">
      <n-input-number v-model:value="model.coin" placeholder="投币" />
    </n-form-item>
    <n-form-item label="收藏" path="star">
      <n-input-number v-model:value="model.star" placeholder="收藏" />
    </n-form-item>

    <n-space justify="space-around" style="padding-top: 20px">
      <n-button type="primary" @click="handleSubmit">提交</n-button>
      <n-button @click="handleCancel">取消</n-button>
    </n-space>
  </n-form>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { FinishInfo } from '@/types/store'
import { useStateStore, useFinishStore, useFinishInfoStore } from '@/stores'
import { storeToRefs } from 'pinia'

const stateStore = useStateStore()
const finishInfoStore = useFinishInfoStore()
const finishStore = useFinishStore()
const { editModel } = storeToRefs(stateStore)

const model = ref({} as FinishInfo)

let rules = {
  title: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入 题材名称'
  },
  like: {
    type: 'number',
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入 点赞数'
  },
  coin: {
    type: 'number',
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入 硬币数'
  },
  star: {
    type: 'number',
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入 收藏数'
  }
}

function handleSubmit() {
  finishStore.update(model.value)
  editModel.value = false
}

function handleCancel() {
  editModel.value = false
}

onMounted(() => {
  model.value = finishInfoStore.$state
})
</script>
