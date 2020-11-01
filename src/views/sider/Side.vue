<template>
  <div id="side" class="no-select">
    <a-row id="icon">
      <img id="logo" src="@/assets/images/logo.png" width="128" alt="logo">
    </a-row>
    <a-row id="menu">
      <div class="menu-btn" :class="isActive(WindowName.Article)"
           @click="active(WindowName.Article)">
        <div class="violet v-article">
          <span class="font-family">{{ side.article }}</span>
        </div>
      </div>
      <div class="menu-btn" :class="isActive(WindowName.Menu)"
           @click="active(WindowName.Menu)">
        <div class="violet v-menu">
          <span class="font-family">{{ side.menu }}</span>
        </div>
      </div>
      <div class="menu-btn" :class="isActive(WindowName.Tag)"
           @click="active(WindowName.Tag)">
        <div class="violet v-tag">
          <span class="font-family"> {{ side.tag }}</span>
        </div>
      </div>
      <div class="menu-btn" :class="isActive(WindowName.Category)"
           @click="active(WindowName.Category)">
        <div class="violet v-category">
          <span class="font-family">{{ side.category }}</span>
        </div>
      </div>
      <div class="menu-btn" :class="isActive(WindowName.Setting)"
           @click="active(WindowName.Setting)">
        <div class="violet v-settings">
          <span class="font-family">{{ side.settings }}</span>
        </div>
      </div>
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
import {defineComponent, inject, Ref, ref} from 'vue'
import {SearchOutlined} from '@ant-design/icons-vue'
import {WindowName} from "@/static/constants"
import store from "@/store/store"
import {getLocale} from "@/tools/get-config"
import {Side} from "@/interfaces/globalization/globalization"


export default defineComponent({
  name: 'Side',
  components: {SearchOutlined},
  setup() {
    let side: Side = getLocale().side
    let currentHomeWindow = inject<Ref<WindowName>>(store.currentHomeWindow, ref(WindowName.Article))
    let isActive = (windowName: WindowName): string => {
      if (currentHomeWindow.value === windowName)
        return 'active'
      else
        return ''
    }
    let active = (windowName: WindowName) => {
      currentHomeWindow.value = windowName
    }
    return {side, active, isActive, currentHomeWindow, WindowName}
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
