/*
 * @Author: HLGhpz
 * @Date: 2022-04-07 21:36:42
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-05-13 10:13:07
 * @Description: 入口文件
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
 */
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from '@/App.vue'
import router from '@/router'
import { naive } from '@/plugins'

// 全局样式
import '@/styles/global.css'
import 'flag-icons/css/flag-icons.min.css'

const app = createApp(App)

app
  .use(createPinia()) // 启用 Pinia
  .use(router)
  // .use(naive)
  .mount('#app')
