<template>
  <div id="app-main">
    <div id="home" v-if="currentAppWindow === WindowName.Home">
      <a-layout>
        <a-layout-sider theme="light"
                        :style="{ overflow: 'hidden', height: '100vh'}">
          <Side/>
        </a-layout-sider>
        <a-layout>
          <a-layout-content
              :style="{ overflow: 'auto', height: '100vh',padding:'30px 0 0 0'}">
            <Article v-if="currentHomeWindow === WindowName.Article"/>
          </a-layout-content>
        </a-layout>
      </a-layout>
    </div>
    <div id="post-editor" v-if="currentAppWindow === WindowName.PostEditor">
      editor
    </div>
  </div>
</template>

<script lang='ts'>
import {defineComponent, ref, provide} from 'vue'
import {WindowName} from '@/static/constants'
import store from "@/store/store"
import Side from "@/views/sider/Side.vue"
import Article from "@/views/article/Article.vue"
import Menu from "@/views/menu/Menu.vue"
import Setting from "@/views/setting/Setting.vue"
import Tag from "@/views/tag/Tag.vue"

export default defineComponent({
  name: "AppMain",
  components: {Side, Article, Menu, Tag, Setting},
  setup() {
    let currentAppWindow = ref<WindowName>(WindowName.Home)
    let currentHomeWindow = ref<WindowName>(WindowName.Article)
    provid<WindowName>(store.currentAppWindow, currentAppWindow)
    provid<WindowName>(store.currentHomeWindow, currentHomeWindow)
    return {currentAppWindow, currentHomeWindow, WindowName}
  }
})
</script>

<style scoped>
#app-main,
#home,
#post-editor {
  width: 100%;
  height: 100%;
}

#home {
  background-color: #ff0000;
}

#post-editor {
  background-color: #46f635;
}
</style>
