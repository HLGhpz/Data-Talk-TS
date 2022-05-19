<!--
 * @Author: HLGhpz
 * @Date: 2022-05-19 21:57:31
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-05-19 22:25:04
 * @Description:
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
-->

<template>
  <div class="card" @click="move">
    <h1>HLG</h1>
  </div>
</template>

<script setup lang="ts">
import gsap from 'gsap'

function move() {
  gsap.to('.card', {
    duration: 1,
    x: 100,
    y: 100,
    rotation: 360,
    scale: 1.5,
    ease: 'elastic.out(1, 0.3)'
  })
}
</script>

<style scoped>
.card {
  width: 300px;
  height: 300px;
  background: #430043;
}
</style>
