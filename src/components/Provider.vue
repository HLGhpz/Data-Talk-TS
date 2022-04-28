<!--
 * @Author: HLGhpz
 * @Date: 2022-04-27 15:43:30
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-04-27 15:43:31
 * @Description:
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
-->
<template>
  <n-config-provider>
    <n-dialog-provider>
      <n-message-provider>
        <n-notification-provider>
          <n-loading-bar-provider>
            <slot />
          </n-loading-bar-provider>
        </n-notification-provider>
      </n-message-provider>
    </n-dialog-provider>
  </n-config-provider>
</template>

<script setup lang="ts"></script>
