<!--
 * @Author: HLGhpz
 * @Date: 2022-04-27 12:29:22
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-04-27 16:10:24
 * @Description:
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
-->

<template>
  <n-layout position="absolute" has-sider>
    <Sidebar />
    <n-layout>
      <Header />
      <Content />
    </n-layout>
  </n-layout>
</template>

<script setup lang="ts">
import { Header } from './Header'
import { Sidebar } from './Sidebar'
import { Footer } from './Footer'
import { Content } from './Content'
</script>

<style scoped></style>
