<template>
  <a-row>
    <WindowFrame/>
  </a-row>
  <a-row>软件主窗口</a-row>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import WindowFrame from '@/components/WindowFrame.vue'

const Window = defineComponent({
  name: 'Window',
  components: {WindowFrame},
  data() {
    return {

    }
  }
})
export default Window
</script>

<style scoped>

</style>
