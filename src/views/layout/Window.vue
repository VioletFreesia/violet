<template>
  <div id="window">
    <WindowFrame/>
    <AppMain></AppMain>
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
#window {
  width: 100%;
  height: 100%;
}
</style>
