<template>
  <div id="settings">
    <a-tabs class="tabs">
      <a-tab-pane key="1" tab="网站设置">
        <site-setting/>
      </a-tab-pane>
      <a-tab-pane key="2" tab="主题设置">
        主题设置
      </a-tab-pane>
      <a-tab-pane key="3" tab="远程设置">
        远程设置
      </a-tab-pane>
      <a-tab-pane key="4" tab="评论设置">
        评论设置
      </a-tab-pane>
      <a-tab-pane key="5" tab="系统设置">
        系统设置
      </a-tab-pane>
      <a-tab-pane key="6" tab="关 于">
        关 于
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import SiteSetting from "@/views/setting/components/SiteSetting.vue"

export default defineComponent({
  name: "Setting",
  components: {SiteSetting},
  setup() {

  }
})
</script>

<style scoped>
#settings {
  padding-left: 10px;
  box-sizing: border-box;
  height: 100%;
}
.tabs {
  height: 100%;
}
</style>
