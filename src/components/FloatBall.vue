<!--
 * @Author: HLGhpz
 * @Date: 2022-04-18 21:39:11
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-04-18 21:59:25
 * @Description:
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
-->

<template>
  <div class="n-float-ball">
    <n-icon class="n-float-ball-icon" size="30" :depth="2">
      <slot></slot>
    </n-icon>
  </div>
</template>

<script lang="ts" setup>
import { NIcon } from 'naive-ui'
</script>

<style>
.n-float-ball {
  position: fixed;
  right: 40px;
  bottom: 40px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 9999;
  cursor: pointer;
}

.n-float-ball-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
