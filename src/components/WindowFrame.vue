<template>
  <a-row id="frame" type="flex" justify="end">
    <div id="mini" class="button" type="flex" @click="miniWindow">
      <LineOutlined/>
    </div>
    <div id="close" class="button" type="flex" @click="closeWindow">
      <CloseOutlined/>
    </div>
  </a-row>
</template>

<script lang='ts'>
import {defineComponent} from 'vue'
import {LineOutlined, CloseOutlined} from '@ant-design/icons-vue'
import events from "@/server/event/events";
import request from "@/server/event/request";


const WindowFrame = defineComponent({
  name: "WindowFrame",
  components: {LineOutlined, CloseOutlined},
  data() {
    return {}
  },
  methods: {
    closeWindow() {
      request(events.windowEvent.closeWindow, null)
    },
    miniWindow() {
      request(events.windowEvent.miniWindow, null)
    }
  }
})
export default WindowFrame
</script>

<style scoped>
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
