<template>
  <div id="article">
    <a-row type="flex">
      <a-col span="8">
        <Post class="card" :post-info="postInfos[0]" @operation="postCardOperationHandler"/>
      </a-col>
      <a-col span="8">
        <Post class="card" :post-info="postInfos[1]" @operation="postCardOperationHandler"/>
      </a-col>
      <a-col span="8">
        <Post class="card" :post-info="postInfos[2]" @operation="postCardOperationHandler"/>
      </a-col>
    </a-row>
    <a-button @click="batchToggle">{{ isBatch }}</a-button>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, provide} from 'vue'
import Post from "@/views/article/components/Post.vue"
import {PostInfo} from "@/interfaces/public/post"
import store from "@/store/store"
import {PostCardOperationType} from "@/static/constants"

let postCardOperationHandler = (operationType: PostCardOperationType, postId: string) => {
  console.log(operationType, postId)
}

export default defineComponent({
  name: "Article",
  components: {Post},
  setup() {
    let postInfos: PostInfo[] = [
      {
        id: 'post1',
        title: '重学Java之IO',
        img: "D:/Program/violet/src/assets/images/default1.jpg",
        tags: [],
        category: {name: 'Java'},
        modifyDate: '2020-11-01',
        isDeploy: true,
        isTop: false,
        isHide: true,
        fileName: '',
      }, {
        id: 'post2',
        title: '重学Java之异常',
        img: "D:/Program/violet/src/assets/images/default2.jpg",
        tags: [],
        category: {name: 'Java'},
        modifyDate: '2020-11-01',
        isDeploy: false,
        isTop: true,
        isHide: false,
        fileName: '',
      }, {
        id: 'post3',
        title: '重学Java之泛型',
        img: "D:/Program/violet/src/assets/images/default3.jpg",
        tags: [],
        category: {name: 'Java'},
        modifyDate: '2020-11-01',
        isDeploy: true,
        isTop: false,
        isHide: false,
        fileName: '',
      }
    ]
    let isBatch = ref<boolean>(false)
    provide(store.article.isBatch, isBatch)
    let batchToggle = () => {
      isBatch.value = !isBatch.value
    }
    return {postInfos, isBatch, batchToggle, postCardOperationHandler}
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

.card {
  margin: 0 auto;
}
</style>
