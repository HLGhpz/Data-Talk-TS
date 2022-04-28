<!--
 * @Author: HLGhpz
 * @Date: 2022-04-27 15:37:37
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-04-27 17:27:09
 * @Description:
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
-->

<template>
  <n-layout-sider
    collapse-mode="transform"
    :collapsed-width="0"
    :width="280"
    bordered
    :collapsed="collapsed"
    class="app-layout-sider"
    show-trigger="bar"
    style="border-top-right-radius: 16px"
    @collapse="collapsed = true"
    @expand="collapsed = false"
  >
    <div class="logo">
      <img src="@/assets/img/hlg.png" alt="" />
      <h2 class="title">HLG</h2>
    </div>
    <n-menu
      :value="activeName"
      :options="layoutOptions"
      :collapsed-width="64"
      :collapsed-icon-size="22"
      @update:value="handleMenuSelect"
    />
  </n-layout-sider>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import menuLink from './menuLink'

const router = useRouter()
const collapsed = ref(false)
const activeName = ref('/')
const layoutOptions = ref(menuLink)
const handleMenuSelect = (value) => {
  activeName.value = value
  console.log('activeName', activeName.value)
  router.push({
    path: value
  })
}
</script>

<style lang="less" scoped>
.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 64px;
  line-height: 64px;
  overflow: hidden;
  white-space: nowrap;

  img {
    width: auto;
    height: 40px;
    margin-right: 20px;
  }
}
</style>
