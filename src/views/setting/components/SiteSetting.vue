<template>
  <div id="site-setting">
    <a-row type="flex">
      <a-col :span="6">
       <div class="side">
          网站配置
       </div>
      </a-col>
      <a-col :span="18"></a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "SiteSetting"
})
</script>

<style scoped>
.side {
  padding-left: 10px;
}
</style>