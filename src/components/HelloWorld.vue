<!--
 * @Author: HLGhpz
 * @Date: 2022-04-07 21:36:42
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-04-13 11:39:46
 * @Description:
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
-->
<template>
  <h1>{{ msg }}</h1>
  <ul>
    <li>
      <router-link :to="{ name: 'lineChart' }">Line Chart</router-link>
    </li>
  </ul>
</template>

<script setup lang="ts">
defineProps<{ msg: string }>()
</script>

<style lang="less" scoped>
ul {
  li {
    line-height: 2;
  }
}

blockquote {
  background-color: #eee;
  padding: (@margin / 2);
  border-radius: @radius;

  p {
    margin: 0;
  }
}

hr {
  width: 60%;
  border-color: #eee;
  margin: @margin auto;
  opacity: 0.2;
}

a {
  color: #42b983;
}

p {
  margin: 0;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
