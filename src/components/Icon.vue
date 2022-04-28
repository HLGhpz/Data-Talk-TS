<!--
 * @Author: HLGhpz
 * @Date: 2022-04-27 15:04:07
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-04-27 21:16:53
 * @Description:
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
-->

<template>
  <n-icon :="props">
    <icon />
  </n-icon>
</template>

<script setup lang="ts">
import { NIcon } from 'naive-ui'

import { LogoGithub as Github, Refresh } from '@vicons/ionicons5'
import { NotepadEdit20Regular as NoteEdit } from '@vicons/fluent'

const icons = {
  Github,
  Refresh,
  NoteEdit
}

const props = defineProps({
  ...NIcon.props,
  type: {
    type: String,
    default: 'Github'
  }
})

const icon = icons[props.type]
</script>

<style scoped></style>
