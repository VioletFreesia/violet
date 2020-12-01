<template>
  <div id="app-main">
    <transition
        enter-active-class="animate__animated animate__zoomIn"
        leave-active-class="animate__disappear">
      <div id="home" v-if="currentAppWindow === WindowName.Home">
        <a-layout>
          <a-layout-sider theme="light"
                          :style="{ overflow: 'hidden', height: '100vh'}">
            <Side @postinfooperation="postInfoOperationHandler"/>
          </a-layout-sider>
          <a-layout>
            <a-layout-content
                :style="{ overflow: 'auto', height: '100vh',padding:'30px 0 0 0'}">
              <transition
                  enter-active-class="animate__animated animate__fadeInLeft">
                <Article v-if="currentHomeWindow === WindowName.Article"
                         :loading="loadPostInfos"
                         @refresh="getAllPostInfo"/>
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
        enter-active-class="animate__animated animate__zoomIn"
        leave-active-class="animate__disappear">
      <div id="post-editor" :filename="'重温Java之IO.md'" :is-Edit="isEdit" v-if="currentAppWindow === WindowName.PostEditor">
        <ArticleEditor/>
      </div>
    </transition>
  </div>
</template>

<script lang='ts'>
import {defineComponent, ref, provide, onMounted} from 'vue'
import {PostCardOperationType, WindowName} from '@/instance/enum/enums'
import store from "@/store/store"
import Side from "@/views/sider/Side.vue"
import Article from "@/views/article/Article.vue"
import Page from "@/views/page/Page.vue"
import Setting from "@/views/setting/Setting.vue"
import RecycleBin from "@/views/recycle-bin/RecycleBin.vue"
import Category from "@/views/category/Category.vue"
import ArticleEditor from "@/views/article-editor/ArticleEditor.vue"
import {PostInfo} from "@/interfaces/public/post"
import api from "@/server/api/api"
import {message} from "ant-design-vue"

export default defineComponent({
  name: "AppMain",
  components: {Side, Article, Page, RecycleBin, Category, Setting, ArticleEditor},
  setup() {
    // 当前app窗口
    let currentAppWindow = ref<WindowName>(WindowName.Home)
    // 当前主页窗口
    let currentHomeWindow = ref<WindowName>(WindowName.Article)
    // 是否为批量编辑模式
    let isBatch = ref<boolean>(false)
    // 是否正在加载文章
    let loadPostInfos = ref<boolean>(true)
    // 文章编辑窗口的模式，true表示编辑状态，false表示新建状态
    let isEdit = ref<boolean>(true)
    // 所有文章信息
    let postInfos = ref<PostInfo[]>([])
    // 获取所有文章信息
    let getAllPostInfo = () => {
      loadPostInfos.value = true
      api.postApi.getAllPostInfo().then(data => {
        postInfos.value = data
        loadPostInfos.value = false
      }).catch(() => {
        postInfos.value = []
        loadPostInfos.value = false
        message.error('文章信息获取失败')
      })
    }
    onMounted(getAllPostInfo)
    let postInfoOperationHandler = (operationType: PostCardOperationType) => {
      let tempPostInfos = postInfos.value.filter(postInfo => postInfo.isSelected)
      if (tempPostInfos.length === 0) {
        message.warning('未选中任何文章')
        return
      }
      api.postApi.postInfoHandle(operationType)!(tempPostInfos.map(postInfo => postInfo.id))
          .then(success => {
            if (success) {
              tempPostInfos.forEach(postInfo => {
                switch (operationType) {
                  case PostCardOperationType.DeleteArticle:
                    postInfo.isDeleted = true
                    break
                  case PostCardOperationType.UnTop:
                    postInfo.isTop = false
                    break
                  case PostCardOperationType.TopArticle:
                    postInfo.isTop = true
                    postInfo.isHide = false
                    break
                  case PostCardOperationType.UnHide:
                    postInfo.isHide = false
                    break
                  case PostCardOperationType.HideArticle:
                    postInfo.isHide = true
                    postInfo.isTop = false
                    break
                  case PostCardOperationType.DeployArticle:
                    postInfo.isDeploy = true
                    break
                  case PostCardOperationType.UnDeploy:
                    postInfo.isDeploy = false
                    break
                }
              })
              switch (operationType) {
                case PostCardOperationType.DeleteArticle:
                  message.success('文章已放入回收站')
                  break
                case PostCardOperationType.UnTop:
                  message.success('已取消置顶')
                  break
                case PostCardOperationType.TopArticle:
                  message.success('文章已置顶')
                  break
                case PostCardOperationType.UnHide:
                  message.success('已取消隐藏')
                  break
                case PostCardOperationType.HideArticle:
                  message.success('文章已隐藏')
                  break
                case PostCardOperationType.DeployArticle:
                  message.success('文章已发布')
                  break
                case PostCardOperationType.UnDeploy:
                  message.success('已取消发布')
                  break
              }
            }
          })
    }
    // 为子组件提供当前是否为批量编辑模式的状态
    provide(store.article.isBatch, isBatch)
    provide(store.currentAppWindow, currentAppWindow)
    provide(store.currentHomeWindow, currentHomeWindow)
    provide(store.article.postInfos, postInfos)
    return {
      currentAppWindow,
      currentHomeWindow,
      loadPostInfos,
      isEdit,
      getAllPostInfo,
      postInfoOperationHandler,
      WindowName
    }
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
