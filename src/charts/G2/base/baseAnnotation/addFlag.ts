/*
 * @Author: HLGhpz
 * @Date: 2022-05-13 20:12:45
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-05-13 20:15:38
 * @Description:
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
 */
import inserCss from 'insert-css'
import { useChartDataStore } from '@/stores'
import { storeToRefs } from 'pinia'

// 全局变量
const chartDataStore = useChartDataStore()
const { latestData } = storeToRefs(chartDataStore)

inserCss(`
  .annotation {
    position: fixed;
    bottom: 150px;
    right: 100px;
    width: 600px;
    z-index: 9999;
  }

  .annotation-flag {
    height: 90px;
    width: 120px;
    color: #757575;
  }

  .annotation-text {
    font-size: 50px;
    color: #757575;
  }
`)

const annotation = document.getElementById('annotation')
const annotationData = latestData.value
annotation.innerHTML = `
<div class="annotation">
<span class="annotation-flag fi fi-${annotationData.Short.toLowerCase()}"></span>
<P class="annotation-text">${annotationData.Zh}：${
  annotationData.DefenseSpend
} 亿＄</P>
<P class="annotation-text">排名：${annotationData.Index}</P>
</div>
`
