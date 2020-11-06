<template>
  <div id="article">
    <a-spin size="large" :spinning="loading">
      <div id="tool-bar">
        <!--        <a-button type="primary" shape="round" ghost>全选</a-button>-->
        <!--        <a-button type="primary" shape="round" ghost>发布</a-button>-->
        <!--        <a-button type="primary" shape="round" ghost>隐藏</a-button>-->
        <!--        <a-button type="primary" shape="round" ghost>置顶</a-button>-->
        <!--        <a-button type="primary" shape="round" ghost>删除</a-button>-->
        <!--        <a-button type="primary" shape="round" ghost>取消发布</a-button>-->
        <!--        <a-button type="primary" shape="round" ghost>取消隐藏</a-button>-->
        <!--        <a-button type="primary" shape="round" ghost>取消置顶</a-button>-->
        <!--        <a-button type="primary" shape="round" ghost>退出批量编辑</a-button>-->
      </div>
      <div id="posts">
        <Post v-for="postInfo in postInfos"
              class="card" :post-info="postInfo"
              @operation="postCardOperationHandler"/>
      </div>
      <a-button @click="batchToggle">{{ isBatch }}</a-button>
    </a-spin>
  </div>
</template>

<script lang="ts">
import {defineComponent, provide, reactive, ref, inject} from 'vue'
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
      }
    }
  },
  setup() {
    let loading = ref<boolean>(true)
    let postInfos = reactive<PostInfo[]>(api.postApi!.getAllPostInfo())
    let isBatch = ref<boolean>(false)
    let currentAppWindow = inject<WindowName>(store.currentAppWindow)!
    provide(store.article.isBatch, isBatch)
    let batchToggle = () => {
      isBatch.value = !isBatch.value
    }
    return {postInfos, isBatch, batchToggle, loading, currentAppWindow}
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
