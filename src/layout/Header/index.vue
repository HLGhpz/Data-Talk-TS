<!--
 * @Author: HLGhpz
 * @Date: 2022-04-27 12:26:58
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-04-27 15:27:05
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
      <n-breadcrumb-item>Home</n-breadcrumb-item>
    </n-breadcrumb>
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
