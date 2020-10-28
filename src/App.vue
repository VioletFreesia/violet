<template>
  <window></window>
</template>

<script lang="ts">
import {provide, reactive} from 'vue'
import Window from "@/layout/Window.vue"
import siteState from "@/store/site"
import {Site} from "@/store/site"
import store from "@/store/store"

export default {
  components: {Window},
  setup() {
    provide<Site>(store.site, reactive<Site>(siteState))
  }
}
</script>
