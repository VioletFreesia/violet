<template>
  <div id="article">
    <a-spin size="large" :spinning="loading">
      <div id="posts">
        <Post v-for="postInfo in postInfos"
              class="card" :post-info="postInfo"
              @operation="postCardOperationHandler"/>
      </div>
      <a-button @click="batchToggle">{{ isBatch }}</a-button>
    </a-spin>
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
import {defineComponent, inject, provide, ref,Ref} from 'vue'
import api from "@/server/api/api"
import Post from "@/views/article/components/Post.vue"
import {PostInfo} from "@/interfaces/public/post"
import store from "@/store/store"
import {PostCardOperationType, WindowName} from "@/static/enums"
import {message} from 'ant-design-vue'

export default defineComponent({
  name: "Article",
  components: {Post},
  setup() {
    // 获取当前软件窗口
    let currentAppWindow = inject<Ref<WindowName>>(store.currentAppWindow)!
    // 用于判断是否在加载文章
    let loading = ref<boolean>(true)
    // 保存所有文章信息
    let postInfos = ref<PostInfo[]>(api.postApi!.getAllPostInfo())
    // 是否为批量编辑模式
    let isBatch = ref<boolean>(false)
    // 是否显示属性编辑弹窗
    let showModifyModel = ref<boolean>(false)
    // 为子组件提供当前是否为批量编辑模式的状态
    provide(store.article.isBatch, isBatch)
    // 文章事件的控制器
    let postCardOperationHandler = (operationType: PostCardOperationType, postId: string) => {
      message.info(operationType + ' ' + postId)
      if (operationType === PostCardOperationType.EditPost) {
        currentAppWindow.value = WindowName.PostEditor
      } else if (operationType === PostCardOperationType.ModifyProperties) {
        showModifyModel.value = true
      }
    }
    let batchToggle = () => {
      isBatch.value = !isBatch.value
    }
    return {
      postInfos,
      isBatch,
      showModifyModel,
      loading,
      currentAppWindow,
      postCardOperationHandler,
      batchToggle
    }
  },
  created() {
    this.loading = false
  }
})
</script>

<style scoped>
#article {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}

#posts {

}

.card {
  margin: 5px 0 0 10px;
}
</style>
