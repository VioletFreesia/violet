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
            <Menu v-if="currentHomeWindow === WindowName.Menu"/>
            <Tag v-if="currentHomeWindow === WindowName.Tag"/>
            <Category v-if="currentHomeWindow === WindowName.Category"/>
            <Setting v-if="currentHomeWindow === WindowName.Setting"/>
          </a-layout-content>
        </a-layout>
      </a-layout>
    </div>
    <div id="post-editor" v-if="currentAppWindow === WindowName.PostEditor">
      <ArticleEditor/>
    </div>
  </div>
</template>

<script lang='ts'>
import {defineComponent, ref, provide, Ref} from 'vue'
import {WindowName} from '@/static/enums'
import store from "@/store/store"
import Side from "@/views/sider/Side.vue"
import Article from "@/views/article/Article.vue"
import Menu from "@/views/menu/Menu.vue"
import Setting from "@/views/setting/Setting.vue"
import Tag from "@/views/tag/Tag.vue"
import Category from "@/views/category/Category.vue"
import ArticleEditor from "@/views/article-editor/ArticleEditor.vue"

export default defineComponent({
  name: "AppMain",
  components: {Side, Article, Menu, Tag, Category, Setting, ArticleEditor},
  setup() {
    let currentAppWindow = ref<WindowName>(WindowName.Home)
    let currentHomeWindow = ref<WindowName>(WindowName.Article)
    provide<Ref<WindowName>>(store.currentAppWindow, currentAppWindow)
    provide<Ref<WindowName>>(store.currentHomeWindow, currentHomeWindow)
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
#post-editor {
  overflow: auto;
}
</style>
