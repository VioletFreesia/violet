<template>
  <window></window>
</template>

<script lang="ts">
import {provide, reactive, defineComponent} from 'vue'
import Window from "@/views/layout/Window.vue"
import {SystemConfig} from "@/interfaces/public/setting";
import api from "@/server/api/api"
import store from "@/store/store"
import {globalization} from "@/static/globalization/globalization"
import {Globalization} from "@/interfaces/globalization/globalization";

export default defineComponent({
  components: {Window},
  setup() {
    // 系统配置
    let systemConfig: SystemConfig = api.settingApi!.getSystemConfig()
    let locale: Globalization = globalization[systemConfig.language]
    provide<Globalization>(store.locale, locale)
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

#app {
  font-family: JetBrainsMono, serif;
  width: 100%;
  height: 100%;
}

/*控制整个滚动条*/
::-webkit-scrollbar {
  background-color: rgba(255, 255, 255, 0.8);
  width: 8px;

}

/*滚动条两端方向按钮*/
::-webkit-scrollbar-button {
  display: none;
}

/*滚动条中间滑动部分*/
::-webkit-scrollbar-thumb {
  background-color: rgba(238, 130, 238, 0.4);
  border-radius: 3px;
}
</style>
