<!--
 * @Author: HLGhpz
 * @Date: 2022-04-07 21:36:42
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-07-27 18:47:31
 * @Description:
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
-->
<template>
  <h1><router-link :to="{ name: 'todo' }">ToDo</router-link></h1>
  <h1><router-link :to="{ name: 'finish' }">Finish</router-link></h1>
  <h1><router-link :to="{ name: 'animation' }">Animation</router-link></h1>
  <ul>
    <li>
      <router-link :to="{ name: 'country' }">Country</router-link>
    </li>
    <li>
      <router-link :to="{ name: 'national' }">National</router-link>
    </li>
    <li>
      <router-link :to="{ name: 'time' }">Time</router-link>
    </li>
    <li>
      <router-link :to="{ name: 'province' }">Province</router-link>
    </li>
    <li>
      <router-link :to="{ name: 'other' }">Other</router-link>
    </li>
  </ul>
</template>

<script setup lang="ts"></script>

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
