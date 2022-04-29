<!--
 * @Author: HLGhpz
 * @Date: 2022-04-28 14:52:45
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-04-28 20:19:20
 * @Description:
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
-->

<template>
  <n-layout-header bordered>
    <n-button text @click="router.go(0)">
      <icon type="Refresh" size="20" :depth="2"></icon>
    </n-button>
    <n-breadcrumb>
      <n-breadcrumb-item>HLG</n-breadcrumb-item>
      <n-breadcrumb-item>Table</n-breadcrumb-item>
      <!-- <n-breadcrumb-item>
        <icon type="AddTask" size="20" :depth="2"></icon>ToDo
      </n-breadcrumb-item>
      <n-breadcrumb-item>
        <icon type="Task" size="20" :depth="2"></icon>Finish
      </n-breadcrumb-item> -->
    </n-breadcrumb>
    <n-space>
      <router-link :to="{ name: 'todo' }" target="_blank"
        ><icon type="AddTask" size="24" :depth="2"></icon
      ></router-link>
    </n-space>
    <n-space>
      <router-link :to="{ name: 'finish' }" target="_blank"
        ><icon type="Task" size="24" :depth="2"></icon
      ></router-link>
    </n-space>
    <n-space :size="20" align="center" style="line-height: 1">
      <n-tooltip>
        <template #trigger>
          <n-a href="https://github.com/HLGhpz/Data-Talk-TS" target="_blank">
            <icon type="Github" size="22" :depth="2"></icon>
          </n-a>
        </template>
        Dashboard help
      </n-tooltip>
    </n-space>
  </n-layout-header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Icon } from '@/components'

const router = useRouter()
</script>

<style scoped>
.n-layout-header {
  position: sticky;
  top: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  padding: 9px 18px;
}

.n-button {
  margin-right: 15px;
}

.n-space {
  margin-left: auto;
}
</style>
