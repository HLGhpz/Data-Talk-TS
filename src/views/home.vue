<!--
 * @Author: HLGhpz
 * @Date: 2022-04-07 21:36:42
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-04-12 16:31:20
 * @Description:
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
-->
<template>
  <div class="home">
    <img alt="Vue logo" :src="hlg" />
    <HelloWorld msg="Hello World" />
  </div>
</template>

<script setup lang="ts">
import HelloWorld from '@cp/HelloWorld.vue'
import hlg from '@img/hlg.png'
</script>

<style lang="less" scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: @color-black;
  padding: (@margin * 3) 0;
  margin: 0 auto;
}
</style>
