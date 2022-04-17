/*
 * @Author: HLGhpz
 * @Date: 2022-04-07 21:36:42
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-04-13 20:38:48
 * @Description: 入口文件
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
 */
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from '@/App.vue'
import router from '@/router'
import '../mock/index'

// 全局样式
import '@less/global.less'

createApp(App)
  .use(createPinia()) // 启用 Pinia
  .use(router)
  .mount('#app')
