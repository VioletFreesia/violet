<template>
  <div id="card" class="no-select" @click="clickCard">
    <div v-if="isTop||isHidden" id="tag">{{ isTop ? 'Top' : 'Hide' }}</div>
    <div v-if="isBatch" id="selector">
      <div class="violet" :class="isSelected?'v-selected':'v-selector'"></div>
    </div>
    <img :src="img" width="320" height="180" alt="">
    <div id="info">
      <div id="title">{{ title }}</div>
      <div id="description">
        <div class="violet" :class="isDeploy?'v-pass':'v-save'">
          <span>{{ isDeploy ? locales[lang].deployStatus : locales[lang].saveStatus }}</span>
        </div>
        <div class="violet v-time">
          <span>{{ time }}</span>
        </div>
        <div class="violet v-category">
          <span>{{ category }}</span>
        </div>
        <div class="more">
          <a-popover placement="rightTop" trigger="click">
            <template v-slot:content>
              <div class="option violet v-no-deploy" v-if="isDeploy"><span>取消发布</span></div>
              <div class="option violet v-deploy" v-else><span>发布文章</span></div>
              <div class="option violet v-show" v-if="isHidden"><span>取消隐藏</span></div>
              <div class="option violet v-hidden" v-if="!isHidden && !isTop"><span>隐藏文章</span></div>
              <div class="option violet v-top" v-if="!isHidden && !isTop"><span>置顶文章</span></div>
              <div class="option violet v-no-top" v-if="isTop"><span>取消置顶</span></div>
              <div class="option violet v-delete"><span>删除文章</span></div>
              <div class="option violet v-edit"><span>修改属性</span></div>
              <div class="option violet v-batch"><span>批量操作</span></div>
            </template>
            <div id="more" class="violet v-more"></div>
          </a-popover>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import {defineComponent, ref} from 'vue'
import locales from "@/static/locales"
import {getLanguage} from "@/tools/get-config"
import {SettingOutlined, EditOutlined, EllipsisOutlined} from '@ant-design/icons-vue'

export default defineComponent({
  name: "Post",
  components: {SettingOutlined, EditOutlined, EllipsisOutlined},
  props: ['id', 'img', 'title', 'isDeploy', 'time', 'category',
    'isTop', 'isHidden', 'isBatch', 'isSelected'],
  setup() {
    let test = ref(true)
    let clickCard = () => {
      test.value = !test.value
    }
    return {lang: getLanguage(), locales, test, clickCard}
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
  background-color: rgba(238,130,238,.7);
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
