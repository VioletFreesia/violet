<template>
  <div id="article">
    <div v-if="loading" class="mask">
      <div class="loading-logo">
        <LoadingOutlined style="font-size: 50px;color: violet"/>
      </div>
    </div>
    <div id="posts">
      <transition v-for="postInfo in postInfos"
                  leave-active-class="animate__animated animate__zoomOut">
        <Post v-if="!postInfo.isDeleted"
              class="card" :post-info="postInfo"
              @operation="postCardOperationHandler"/>
      </transition>
    </div>
    <a-modal
        title="修改属性"
        v-model:visible="showModifyModel"
        okText="保存"
        cancelText="取消"
        :maskClosable="false">
      <p>修改文章属性</p>
    </a-modal>
  </div>
</template>

<script lang="ts">
import {defineComponent, inject, ref, Ref} from 'vue'
import api from "@/server/api/api"
import Post from "@/views/article/components/Post.vue"
import {PostInfo} from "@/interfaces/public/post"
import store from "@/store/store"
import {PostCardOperationType, WindowName} from "@/instance/enum/enums"
import {message} from 'ant-design-vue'
import {LoadingOutlined} from '@ant-design/icons-vue'

export default defineComponent({
  name: "Article",
  components: {Post, LoadingOutlined},
  props: ['loading'],
  setup(prop, {emit}) {
    // 获取当前软件窗口
    let currentAppWindow = inject<Ref<WindowName>>(store.currentAppWindow)!
    // 获取所有文章信息
    let postInfos = inject<Ref<PostInfo[]>>(store.article.postInfos)!
    // 编辑器模式
    let isEdit = inject<Ref<boolean>>(store.article.isEdit)!
    // 加载的文件名
    let filename = inject<Ref<string>>(store.article.filename)!
    // 是否显示属性编辑弹窗
    let showModifyModel = ref<boolean>(false)
    // 刷新文章信息
    let refreshPostInfo = () => {
      emit('refresh')
    }
    // 文章事件的控制器
    let postCardOperationHandler =
        (operationType: PostCardOperationType, postId: string) => {
          switch (operationType) {
            case PostCardOperationType.EditPost:
              isEdit.value = true
              filename.value = postInfos.value.filter(item => item.id === postId)[0].fileName
              currentAppWindow.value = WindowName.PostEditor
              break;
            case PostCardOperationType.ModifyProperties:
              showModifyModel.value = true
              break
            case PostCardOperationType.BatchOption:
              // 进入批量编辑前让所有文章处于未选中状态
              postInfos.value.forEach(postInfo => {
                if (postInfo.isSelected) {
                  postInfo.isSelected = false
                }
              })
              break
            default:
              api.postApi.postInfoHandle(operationType)!([postId]).then(success => {
                if (success) {
                  let postInfo = postInfos.value.filter(item => item.id === postId)[0]
                  switch (operationType) {
                    case PostCardOperationType.DeleteArticle:
                      postInfo.isDeleted = true
                      message.success('文章已放入回收站')
                      break
                    case PostCardOperationType.UnTop:
                      postInfo.isTop = false
                      message.success('已取消置顶')
                      break
                    case PostCardOperationType.TopArticle:
                      postInfo.isTop = true
                      postInfo.isHide = false
                      message.success('文章已置顶')
                      break
                    case PostCardOperationType.UnHide:
                      postInfo.isHide = false
                      message.success('已取消隐藏')
                      break
                    case PostCardOperationType.HideArticle:
                      postInfo.isHide = true
                      postInfo.isTop = false
                      message.success('文章已隐藏')
                      break
                    case PostCardOperationType.DeployArticle:
                      postInfo.isDeploy = true
                      message.success('文章已发布')
                      break
                    case PostCardOperationType.UnDeploy:
                      postInfo.isDeploy = false
                      message.success('已取消发布')
                      break
                  }
                }
              })
          }
        }
    return {
      postInfos,
      showModifyModel,
      currentAppWindow,
      refreshPostInfo,
      postCardOperationHandler
    }
  }
})
</script>

<style scoped>
#article {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
}

.mask {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 3;
  background-color: rgba(240, 240, 240, .7);
}

.loading-logo {
  width: 50px;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

#posts {

}

.card {
  margin: 5px 0 0 10px;
}
</style>
