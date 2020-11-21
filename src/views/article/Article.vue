<template>
  <div id="article">
    <a-spin size="large" :spinning="loading">
      <div id="tool-bar">
      </div>
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
import {defineComponent, inject, provide, ref} from 'vue'
import api from "@/server/api/api"
import Post from "@/views/article/components/Post.vue"
import {PostInfo} from "@/interfaces/public/post"
import store from "@/store/store"
import {PostCardOperationType, WindowName} from "@/static/enums"
import {message} from 'ant-design-vue'

export default defineComponent({
  name: "Article",
  components: {Post},
  methods: {
    postCardOperationHandler(operationType: PostCardOperationType, postId: string) {
      message.info(operationType + ' ' + postId)
      if (operationType === PostCardOperationType.EditPost) {
        this.currentAppWindow = WindowName.PostEditor
      } else if (operationType === PostCardOperationType.ModifyProperties) {
        this.showModifyModel = true
      }
    }
  },
  setup() {
    let loading = ref<boolean>(true)
    let postInfos = ref<PostInfo[]>(api.postApi!.getAllPostInfo())
    let isBatch = ref<boolean>(false)
    let showModifyModel = ref<boolean>(false)
    let currentAppWindow = inject<WindowName>(store.currentAppWindow)!
    provide(store.article.isBatch, isBatch)
    let batchToggle = () => {
      isBatch.value = !isBatch.value
    }
    return {postInfos, isBatch, showModifyModel, batchToggle, loading, currentAppWindow}
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
