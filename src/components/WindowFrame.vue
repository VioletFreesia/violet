<!--窗口控制组件,控制窗口的最小化和关闭-->
<template>
  <div id="box">
    <a-row id="frame" type="flex" justify="end">
      <!--最小化按钮-->
      <div id="mini" class="button" type="flex" @click="miniWindow">
        <LineOutlined/>
      </div>
      <!--关闭按钮-->
      <div id="close" class="button" type="flex" @click="closeWindow">
        <CloseOutlined/>
      </div>
    </a-row>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {LineOutlined, CloseOutlined} from '@ant-design/icons-vue'
import events from "@/server/event/events";
import request from "@/server/event/request";

let closeWindow = () => {
  request(events.windowEvent.closeWindow, null)
}
let miniWindow = () => {
  request(events.windowEvent.miniWindow, null)
}
export default defineComponent({
  name: "WindowFrame",
  components: {LineOutlined, CloseOutlined},
  setup() {
    return {closeWindow, miniWindow}
  }
})
</script>

<style scoped>
#box {
  position: fixed;
  width: 100%;
  z-index: 9999;
}

#frame {
  height: 30px;
  -webkit-app-region: drag
}

.button {
  width: 20px;
  height: 20px;
  margin: 5px 8px;
  padding-left: 3px;
  line-height: 20px;
  border-radius: 50%;
  overflow: hidden;
  -webkit-app-region: no-drag
}

#close {
  margin-right: 15px;
}

#mini:hover {
  background-color: #46f635;
}

#close:hover {
  background-color: #ff0000;
}
</style>
