<template>
  <window></window>
</template>

<script lang="ts">
import {provide, reactive, defineComponent} from 'vue'
import Window from "@/views/layout/Window.vue"
import {SystemConfig} from "@/interfaces/public/setting";
import api from "@/server/api/api"
import store from "@/store/store"

export default defineComponent({
  components: {Window},
  setup() {
    let systemConfig = api.settingApi?.getSystemConfig()
    provide<SystemConfig>(store.systemConfig, reactive<SystemConfig>(systemConfig))
  }
})
</script>
<style>
html, body {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
