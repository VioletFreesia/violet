<template>
  <div id="side" class="no-select">
    <a-row id="icon">
      <img id="logo" src="@/assets/images/logo.png" width="128" alt="logo">
    </a-row>
    <a-row id="menu">
      <transition
          enter-active-class="animate__animated animate__fadeInLeft"
          leave-active-class="animate__disappear">
        <div v-show="!isBatch" class="change-window-menu">
          <div v-for="menu in changeWindowMenu"
               class="menu-btn"
               :class="{active: currentHomeWindow === menu.targetHomeWindow}"
               @click="changeHomeWindow(menu.targetHomeWindow)">
            <div class="violet" :class="menu.iconName">
              <span class="font-family">{{ menu.text }}</span>
            </div>
          </div>
        </div>
      </transition>
      <transition
          enter-active-class="animate__animated animate__fadeInLeft"
          leave-active-class="animate__disappear">
        <div v-show="isBatch" class="batch-option-menu">
          <div v-for="menu in batchOptionMenus"
               class="menu-btn"
               @click="batchOption(menu.operationType)">
            <div class="violet" :class="menu.iconName">
              <span class="font-family">{{ menu.text }}</span>
            </div>
          </div>
        </div>
      </transition>
    </a-row>
    <div class="side-btn">
      <a-button id="preview" shape="round" block>
        <div class="violet v-preview">
          <span class="font-family"> {{ side.preview }}</span>
        </div>
      </a-button>
      <a-button id="deploy" shape="round" block>
        <div class="violet v-deploy">
          <span class="font-family">{{ side.deploy }}</span>
        </div>
      </a-button>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, inject, Ref} from 'vue'
import {SearchOutlined} from '@ant-design/icons-vue'
import {PostCardOperationType, WindowName} from "@/instance/enum/enums"
import store from "@/store/store"
import {getLocale} from "@/tools/get-config"
import {batchOptionMenu, changeHomeWindowMenu} from "@/instance/side/side-menus"


export default defineComponent({
  name: 'Side',
  components: {SearchOutlined},
  setup(props, {emit}) {
    // 获取当前主页窗口
    let currentHomeWindow = inject<Ref<WindowName>>(store.currentHomeWindow)!
    // 获取批量编辑模式状态
    let isBatch = inject<Ref<boolean>>(store.article.isBatch)!
    // 获取侧边栏语言包
    let side = getLocale().side
    let postCard = getLocale().postCard
    // 获取切换主页窗口的菜单数组
    let changeWindowMenu = changeHomeWindowMenu(side)
    // 批量操作菜单数组
    let batchOptionMenus = batchOptionMenu(postCard)
    // 切换主页窗口
    let changeHomeWindow = (windowName: WindowName) => {
      currentHomeWindow.value = windowName
    }
    let batchOption = (operationType: PostCardOperationType) => {
      if (operationType === PostCardOperationType.QuitBatchOption) {
        isBatch.value = false
      } else {
        emit('postinfooperation', operationType)
      }
    }
    return {
      side,
      isBatch,
      currentHomeWindow,
      changeWindowMenu,
      batchOptionMenus,
      WindowName,
      changeHomeWindow,
      batchOption
    }
  }
})
</script>


<style scoped>
#side {
  height: 100vh;
  overflow: hidden;
  position: relative;
}

.font-family {
  display: inline-block;
  margin-left: 12px;
}

.menu-btn {
  margin: 10px 0;
  padding: 5px 0;
}


.menu-btn:hover {
  background-color: #e8e8e8;
}

.menu-btn .violet {
  margin-left: 25px;
  color: grey;
}

.menu-btn .violet:hover {
  cursor: pointer;
  color: violet;
}

.active {
  background-color: #e8e8e8;
}

.active .violet {
  color: violet;
}

.side-btn {
  width: 100%;
  position: absolute;
  padding: 0 20px;
  bottom: 30px;
}

.side-btn .violet {
  display: inline-block;
}

#deploy:focus,
#deploy:hover,
#preview:focus,
#preview:hover {
  color: violet;
  border-color: violet;
}

#preview {
  margin-bottom: 18px;
}

#icon {
  height: 150px;
  -webkit-app-region: drag
}

#logo {
  display: block;
  margin: 10px auto 10px;
}

</style>
