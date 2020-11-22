<template>
  <div id="app-main">
    <transition
        enter-active-class="animate__animated animate__zoomIn">
      <div id="home" v-if="currentAppWindow === WindowName.Home">
        <a-layout>
          <a-layout-sider theme="light"
                          :style="{ overflow: 'hidden', height: '100vh'}">
            <Side/>
          </a-layout-sider>
          <a-layout>
            <a-layout-content
                :style="{ overflow: 'auto', height: '100vh',padding:'30px 0 0 0'}">
              <transition
                  enter-active-class="animate__animated animate__fadeInLeft">
                <Article v-if="currentHomeWindow === WindowName.Article"/>
              </transition>
              <transition
                  enter-active-class="animate__animated animate__fadeInLeft">
                <Page v-if="currentHomeWindow === WindowName.Page"/>
              </transition>
              <transition
                  enter-active-class="animate__animated animate__fadeInLeft">
                <Category v-if="currentHomeWindow === WindowName.Category"/>
              </transition>
              <transition
                  enter-active-class="animate__animated animate__fadeInLeft">
                <Setting v-if="currentHomeWindow === WindowName.Setting"/>
              </transition>
              <transition
                  enter-active-class="animate__animated animate__fadeInLeft">
                <RecycleBin v-if="currentHomeWindow === WindowName.RecycleBin"/>
              </transition>
            </a-layout-content>
          </a-layout>
        </a-layout>
      </div>
    </transition>
    <transition
        enter-active-class="animate__animated animate__zoomIn">
      <div id="post-editor" v-if="currentAppWindow === WindowName.PostEditor">
        <ArticleEditor/>
      </div>
    </transition>
  </div>
</template>

<script lang='ts'>
import {defineComponent, ref, provide} from 'vue'
import {WindowName} from '@/static/enums'
import store from "@/store/store"
import Side from "@/views/sider/Side.vue"
import Article from "@/views/article/Article.vue"
import Page from "@/views/page/Page.vue"
import Setting from "@/views/setting/Setting.vue"
import RecycleBin from "@/views/recycle-bin/RecycleBin.vue"
import Category from "@/views/category/Category.vue"
import ArticleEditor from "@/views/article-editor/ArticleEditor.vue"

export default defineComponent({
  name: "AppMain",
  components: {Side, Article, Page, RecycleBin, Category, Setting, ArticleEditor},
  setup() {
    // 当前app窗口
    let currentAppWindow = ref<WindowName>(WindowName.Home)
    // 当前主页窗口
    let currentHomeWindow = ref<WindowName>(WindowName.Article)
    provide(store.currentAppWindow, currentAppWindow)
    provide(store.currentHomeWindow, currentHomeWindow)
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
