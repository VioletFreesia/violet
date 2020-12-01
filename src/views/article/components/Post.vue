<template>
  <div id="card" class="no-select">
    <div id="card-mask" @click="selectorToggle"></div>
    <div v-if="postInfo.isTop||postInfo.isHide" id="tag">{{ postInfo.isTop ? 'Top' : 'Hide' }}</div>
    <div v-if="isBatch" id="selector">
      <div class="violet" :class="postInfo.isSelected?'v-selected':'v-selector'"></div>
    </div>
    <img :src="imgPathConvert(postInfo.img)" width="320" height="180" alt="">
    <div id="info">
      <div id="title">{{ postInfo.title }}</div>
      <div id="description">
        <div class="violet" :class="postInfo.isDeploy?'v-pass':'v-save'">
          <span>{{ postInfo.isDeploy ? postCard.deployStatus : postCard.saveStatus }}</span>
        </div>
        <div class="violet v-updateTime">
          <span>{{ postInfo.modifyDate }}</span>
        </div>
        <div class="violet v-category">
          <span>{{ postInfo.category }}</span>
        </div>
        <div class="more">
          <a-popover v-model:visible="moreVisible"
                     placement="rightTop"
                     trigger="click"
                     @visibleChange="isAble">
            <template v-slot:content>
              <div class="option violet v-no-deploy"
                   v-if="postInfo.isDeploy"
                   @click="operation(PostCardOperationType.UnDeploy)">
                <span>{{ postCard.unDeploy }}</span>
              </div>
              <div class="option violet v-deploy" v-else
                   @click="operation(PostCardOperationType.DeployArticle)">
                <span>{{ postCard.deployArticle }}</span>
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
                   @click="operation(PostCardOperationType.UnTop)">
                <span>{{ postCard.unTop }}</span>
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
                <span>{{ postCard.batchOperation }}</span>
              </div>
            </template>
            <div :class="isBatch? 'batch':'no-batch'" class="violet v-more"></div>
          </a-popover>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import {defineComponent, inject, PropType, ref, Ref} from 'vue'
import {getLocale} from "@/tools/get-config"
import {PostCard} from "@/interfaces/globalization/globalization"
import {EditOutlined, EllipsisOutlined, SettingOutlined} from '@ant-design/icons-vue'
import {PostInfo} from "@/interfaces/public/post"
import {PostCardOperationType} from "@/instance/enum/enums"
import store from "@/store/store"
import {SystemConfig} from "@/interfaces/public/setting"

export default defineComponent({
  name: "Post",
  components: {SettingOutlined, EditOutlined, EllipsisOutlined},
  props: {
    postInfo: {
      type: Object as PropType<PostInfo>,
      require: true
    }
  },
  setup(props, {emit}) {
    // 获取当前的编辑状态是否为批量编辑
    let isBatch = inject<Ref<boolean>>(store.article.isBatch)!
    // 文章操作菜单是否可见
    let moreVisible = ref<boolean>(false)
    // 获取文章卡片的界面语言包
    let postCard: PostCard = getLocale().postCard
    // 修改当前的编辑状态
    let batch = () => {
      operation(PostCardOperationType.BatchOption)
      moreVisible.value = false
      isBatch!.value = true
    }
    // 如果处于批量编辑模式选中或取消选中当前文章,非批量编辑模式查看/编辑当前文章
    let selectorToggle = () => {
      if (isBatch.value) {
        props.postInfo!.isSelected = !props.postInfo!.isSelected
      } else {
        operation(PostCardOperationType.EditPost)
      }
    }
    // 文章操作功能处理
    let operation = (operationType: PostCardOperationType) => {
      moreVisible.value = false
      emit('operation', operationType, props.postInfo!.id)
    }
    // 文章操作功能是否可用, 如果是批量编辑模式下禁用文章操作功能
    let isAble = (visible: boolean) => {
      if (isBatch.value) {
        if (visible) {
          moreVisible.value = false
        }
      }
    }
    // 文章路径转换函数 如果是http开头的就不进行转换，如果是'/'开头的就转为绝对路径
    let imgPathConvert = (row: string): string => {
      if (row.startsWith('http'))
        return row
      else {
        let systemConfig = inject<Ref<SystemConfig>>(store.systemConfig)
        return `file://${systemConfig?.value.workspace + row}`
      }
    }
    return {
      postCard,
      isBatch,
      moreVisible,
      batch,
      selectorToggle,
      operation,
      isAble,
      imgPathConvert,
      PostCardOperationType
    }
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
  background-color: #e8e8e8;
  background-image: url("../../../assets/images/picture.png");
  background-repeat: no-repeat;
  background-position: center;
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
  font-family: JetBrainsMono;
  display: inline-block;
  margin-left: 3px;
}

#description div {
  flex: auto;
  text-align: center;
}

.batch:hover {
  cursor: not-allowed;
}

.no-batch:hover {
  color: violet;
  cursor: pointer;
}

.v-selected {
  color: magenta;
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
