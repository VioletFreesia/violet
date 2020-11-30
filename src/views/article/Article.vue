<template>
  <div id="article">
    <div v-if="loading" class="mask">
      <div class="loading-logo">
        <LoadingOutlined style="font-size: 50px;color: violet"/>
      </div>
    </div>
    <div id="posts">
      <Post v-for="postInfo in postInfos"
            class="card" :post-info="postInfo"
            @operation="postCardOperationHandler"/>
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
  setup() {
    // 获取当前软件窗口
    let currentAppWindow = inject<Ref<WindowName>>(store.currentAppWindow)!
    // 用于判断是否在加载文章
    let loading = ref<boolean>(true)
    // 保存所有文章信息
    let postInfos = ref<PostInfo[]>([])
    // 是否显示属性编辑弹窗
    let showModifyModel = ref<boolean>(false)
    // 获取所有文章信息
    let getAllPostInfo = () => {
      loading.value = true
      api.postApi.getAllPostInfo().then(data => {
        postInfos.value = data
        loading.value = false
      }).catch(() => {
        postInfos.value = []
        loading.value = false
        message.error('文章信息获取失败')
      })
    }
    getAllPostInfo()
    // 文章事件的控制器
    let postCardOperationHandler = (operationType: PostCardOperationType, postId: string) => {
      message.info(operationType + ' ' + postId)
      switch (operationType) {
        case PostCardOperationType.EditPost:
          currentAppWindow.value = WindowName.PostEditor
          break;
        case PostCardOperationType.ModifyProperties:
          showModifyModel.value = true
          break
        case PostCardOperationType.DeleteArticle:
          api.postApi.deletePosts([postId]).then(data => {
            postInfos.value = data
            message.success('文章已放入回收站')
          }).catch(() => {
            message.error('删除文章失败')
          })
      }
    }
    return {
      postInfos,
      showModifyModel,
      loading,
      currentAppWindow,
      getAllPostInfo,
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
