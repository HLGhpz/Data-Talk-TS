/*
 * @Author: HLGhpz
 * @Date: 2022-04-07 21:36:42
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-04-28 11:13:02
 * @Description: 入口文件
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
 */
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from '@/App.vue'
import router from '@/router'

// 全局样式
import '@/styles/global.css'

createApp(App)
  .use(createPinia()) // 启用 Pinia
  .use(router)
  .mount('#app')
