<template>
  <a-layout>
    <a-layout-sider theme="light"
                    :style="{ overflow: 'hidden', height: '100vh'}">
      <Side></Side>
    </a-layout-sider>
    <a-layout>
      <a-layout-content
          :style="{ overflow: 'auto', height: '100vh',padding:'30px 0 0 0'}">
        <Article></Article>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang='ts'>
import {defineComponent} from 'vue'
import Side from "@/views/sider/Side.vue"
import Article from "@/views/article/Article.vue"

export default defineComponent({
  name: "AppMain",
  components: {Side, Article},
  setup() {

  }
})
</script>

<style scoped>

</style>
