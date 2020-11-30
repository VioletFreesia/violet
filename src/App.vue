<template>
  <window></window>
</template>

<script lang="ts">
import {provide, ref, defineComponent} from 'vue'
import Window from "@/views/layout/Window.vue"
import {SystemConfig} from "@/interfaces/public/setting";
import api from "@/server/api/api"
import store from "@/store/store"
import {globalization} from "@/instance/globalization/globalization"
import {Globalization} from "@/interfaces/globalization/globalization";

export default defineComponent({
  components: {Window},
  setup() {
    // 系统配置
    let systemConfig: SystemConfig = api.settingApi!.getSystemConfig()
    let locale: Globalization = globalization[systemConfig.language]
    provide(store.locale, locale)
    provide(store.systemConfig, ref(systemConfig))
  }
})
</script>
<style>
html, body {
  width: 100%;
  height: 100%;
  display: block;
  background-color: transparent !important;
}

#app {
  font-family: JetBrainsMono;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  overflow: hidden;
  background-color: #fff;
}

/*控制整个滚动条*/
::-webkit-scrollbar {
  background-color: rgba(255, 255, 255, 0);
  width: 8px;
  height: 8px;
  cursor: pointer;
}

/*滚动条两端方向按钮*/
::-webkit-scrollbar-button {
  display: none;
}

/*滚动条中间滑动部分*/
::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, .15);
  border-radius: 4px;
}
</style>
