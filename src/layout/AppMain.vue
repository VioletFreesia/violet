<template>
  <a-layout>
    <a-layout-sider theme="light"
                    :style="{ overflow: 'auto', height: '100vh'}">
      <Side></Side>
    </a-layout-sider>
    <a-layout>
      <a-layout-content
          :style="{ overflow: 'auto', height: '100vh',padding:'30px 0 0 0'}">
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang='ts'>
import Side from "@/views/sider/Side.vue";

export default {
  name: "AppMain",
  components: {Side}
}
</script>

<style scoped>

</style>
