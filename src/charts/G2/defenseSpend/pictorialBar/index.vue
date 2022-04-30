<template>
  <div class="chart-wrapper" id="container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Chart } from '@antv/g2'

onMounted(async () => {
  const chart = new Chart({
    container: 'container',
    autoFit: true
  })
})
</script>

<style scoped>
.chart-wrapper {
  background-image: url(@/assets/img/backGround-purple.png);
}
</style>
