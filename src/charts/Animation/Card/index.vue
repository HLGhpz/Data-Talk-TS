<!--
 * @Author: HLGhpz
 * @Date: 2022-05-19 21:57:31
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-05-20 17:05:15
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
    keyframes: [
      { x: 400, duration: 1 },
      { y: 400, duration: 1 },
      { x: 0, duration: 1, delay: 1 },
      { y: 0, duration: 1, delay: 1 },
      { rotation: 360, duration: 2, delay: 1 }
    ],
    easeEach: 'expo.inOut'
  })
}
</script>

<style scoped>
.card {
  width: 420px;
  height: 680px;
  top: 200px;
  left: 750px;
  position: absolute;
  background: #430043;
}
</style>
