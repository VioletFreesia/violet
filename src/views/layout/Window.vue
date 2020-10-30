<template>
  <div>
    <a-row>
      <WindowFrame/>
    </a-row>
    <a-row>
      <AppMain></AppMain>
    </a-row>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import WindowFrame from '@/components/WindowFrame.vue'
import AppMain from './AppMain.vue'

export default defineComponent({
  name: 'Window',
  components: {WindowFrame, AppMain},
})
</script>

<style scoped>

</style>
