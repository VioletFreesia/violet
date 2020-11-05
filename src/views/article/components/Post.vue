<template>
  <div id="card" class="no-select">
    <div id="card-mask" @click="selectorToggle"></div>
    <div v-if="postInfo.isTop||postInfo.isHide" id="tag">{{ postInfo.isTop ? 'Top' : 'Hide' }}</div>
    <div v-if="isBatch" id="selector">
      <div class="violet" :class="postInfo.isSelected?'v-selected':'v-selector'"></div>
    </div>
    <img :src="postInfo.img" width="320" height="180" alt="">
    <div id="info">
      <div id="title">{{ postInfo.title }}</div>
      <div id="description">
        <div class="violet" :class="postInfo.isDeploy?'v-pass':'v-save'">
          <span>{{ postInfo.isDeploy ? postCard.deployStatus : postCard.saveStatus }}</span>
        </div>
        <div class="violet v-time">
          <span>{{ postInfo.modifyDate }}</span>
        </div>
        <div class="violet v-category">
          <span>{{ postInfo.category.name }}</span>
        </div>
        <div class="more">
          <a-popover v-model:visible="moreVisible"
                     placement="rightTop"
                     trigger="click"
                     @visibleChange="isAble">
            <template v-slot:content>
              <div class="option violet v-no-deploy"
                   v-if="postInfo.isDeploy"
                   @click="operation(PostCardOperationType.UnPublish)">
                <span>{{ postCard.unPublish }}</span>
              </div>
              <div class="option violet v-deploy" v-else
                   @click="operation(PostCardOperationType.PostArticle)">
                <span>{{ postCard.postArticle }}</span>
              </div>
              <div class="option violet v-show"
                   v-if="postInfo.isHide"
                   @click="operation(PostCardOperationType.UnHide)">
                <span>{{ postCard.unHide }}</span>
              </div>
              <div class="option violet v-hidden"
                   v-if="!postInfo.isHide && !postInfo.isTop"
                   @click="operation(PostCardOperationType.HideArticle)">
                <span>{{ postCard.hideArticle }}</span>
              </div>
              <div class="option violet v-top"
                   v-if="!postInfo.isHide && !postInfo.isTop"
                   @click="operation(PostCardOperationType.TopArticle)">
                <span>{{ postCard.topArticle }}</span>
              </div>
              <div class="option violet v-no-top"
                   v-if="postInfo.isTop"
                   @click="operation(PostCardOperationType.UnPink)">
                <span>{{ postCard.unPink }}</span>
              </div>
              <div class="option violet v-delete"
                   @click="operation(PostCardOperationType.DeleteArticle)">
                <span>{{ postCard.deleteArticle }}</span>
              </div>
              <div class="option violet v-edit"
                   @click="operation(PostCardOperationType.ModifyProperties)">
                <span>{{ postCard.modifyProperties }}</span>
              </div>
              <div class="option violet v-batch" @click="batch">
                <span>{{ postCard.bulkOperation }}</span>
              </div>
            </template>
            <div :id="isBatch?'':'more'" class="violet v-more"></div>
          </a-popover>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import {defineComponent, ref, PropType, inject, Ref} from 'vue'
import {getLocale} from "@/tools/get-config"
import {PostCard} from "@/interfaces/globalization/globalization"
import {SettingOutlined, EditOutlined, EllipsisOutlined} from '@ant-design/icons-vue'
import {PostInfo} from "@/interfaces/public/post"
import {PostCardOperationType} from "@/static/constants"
import store from "@/store/store"

export default defineComponent({
  name: "Post",
  components: {SettingOutlined, EditOutlined, EllipsisOutlined},
  props: {
    postInfo: {
      type: Object as PropType<PostInfo>,
      require: true
    }
  },
  methods: {
    selectorToggle() {
      if (this.isBatch) {
        this.postInfo!.isSelected = !this.postInfo!.isSelected
      } else {
        this.$emit('operation', PostCardOperationType.EditPost, this.postInfo!.id)
      }
    },
    operation(operationType: PostCardOperationType) {
      this.moreVisible = false
      this.$emit('operation', operationType, this.postInfo!.id)
    },
    isAble(visible: boolean) {
      if (this.isBatch) {
        if (visible) {
          this.moreVisible = false
        }
      }
    }
  },

  setup() {
    let moreVisible = ref<boolean>(false)
    let isBatch = inject<Ref<boolean>>(store.article.isBatch)
    let batch = () => {
      moreVisible.value = false
      isBatch!.value = true
    }
    let postCard: PostCard = getLocale().postCard
    return {postCard, isBatch, moreVisible, batch, PostCardOperationType}
  }
})
</script>

<style scoped>
#card {
  width: 320px;
  height: 180px;
  position: relative;
  display: inline-block;
  border-radius: 15px;
  border: solid 1px rgba(0, 0, 0, 0);
  box-sizing: border-box;
  overflow: hidden;
}

#card:hover {
  border: solid 1px #ee82ee;
  box-shadow: 0 5px 10px rgba(238, 130, 238, .5), 0 0 6px rgba(238, 130, 238, .5)
}

#card-mask {
  width: 100%;
  height: 150px;
  position: absolute;
  z-index: 1;
}

#info {
  width: 320px;
  min-height: 30px;
  padding: 5px 10px;
  bottom: 0;
  position: absolute;
  color: #e8e8e8;
  font-family: JetBrainsMono, serif;
  font-size: 16px;
  background-color: rgba(0, 0, 0, .4);
  border-radius: 0 0 15px 15px;
}

#tag {
  width: 80px;
  height: 18px;
  left: -18px;
  top: 10px;
  line-height: 18px;
  text-align: center;
  position: absolute;
  background-color: rgba(238, 130, 238, .7);
  transform: rotate(-45deg);
}

#selector {
  top: 4px;
  right: 10px;
  cursor: pointer;
  position: absolute;
}

#selector .violet {
  font-size: 24px;
}

#title {
  word-break: break-all;
}

#description {
  height: 20px;
  margin-top: 5px;
  display: flex;
  color: #d9d9d9;
}

#description .violet {
  font-size: 12px;
}

#description .violet span {
  font-family: JetBrainsMono, serif;
  display: inline-block;
  margin-left: 3px;
}

#description div {
  flex: auto;
  text-align: center;
}

#more:hover {
  color: violet;
  cursor: pointer;
}

.option {
  min-width: 120px;
  margin: 2px 0;
  padding-left: 10px;
}

.more .violet {
  font-size: 12px;
}

.option span {
  display: inline-block;
  margin-left: 5px;
}

.option:hover {
  color: violet;
  background-color: #e8e8e8;
  user-select: none;
  cursor: pointer;
}
</style>
<style>
.ant-popover-inner-content {
  padding: 10px 0 !important;
}
</style>
