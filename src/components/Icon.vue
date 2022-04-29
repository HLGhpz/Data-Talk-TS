<!--
 * @Author: HLGhpz
 * @Date: 2022-04-28 14:33:39
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-04-28 22:37:28
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
import { AddTaskSharp as AddTask, TaskAltSharp as Task } from '@vicons/material'
import { StopOutlined as Stop } from '@vicons/antd'

const icons = {
  Github,
  Refresh,
  NoteEdit,
  AddTask,
  Task,
  Stop
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
