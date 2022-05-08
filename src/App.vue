<!--
 * @Author: HLGhpz
 * @Date: 2022-04-17 16:45:42
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-04-27 15:45:25
 * @Description:
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
-->
<template>
  <router-view :key="key" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const key = computed(() =>
  route.name ? String(route.name) + new Date() : String(route.path) + new Date()
)
</script>
