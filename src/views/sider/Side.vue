<template>
  <div id="box">
    <a-row id="icon">
      <img id="logo" src="@/assets/images/logo.png" width="128" alt="logo">
    </a-row>
    <a-row id="menu">
      <div :class="isActive===1?'menu-btn active':'menu-btn'"
           @click="active(1)">
        <div class="violet v-article">
          <span>&nbsp;</span>
          {{ locales[lang].article }}
        </div>
      </div>
      <div :class="isActive===2?'menu-btn active':'menu-btn'"
           @click="active(2)">
        <div class="violet v-menu">
          <span>&nbsp;</span>
          {{ locales[lang].menu }}
        </div>
      </div>
      <div :class="isActive===3?'menu-btn active':'menu-btn'"
           @click="active(3)">
        <div class="violet v-tag">
          <span>&nbsp;</span>
          {{ locales[lang].tag }}
        </div>
      </div>
      <div :class="isActive===4?'menu-btn active':'menu-btn'"
           @click="active(4)">
        <div class="violet v-settings">
          <span>&nbsp;</span>
          {{ locales[lang].settings }}
        </div>
      </div>
    </a-row>
    <div class="side-btn">
      <a-button id="preview" shape="round" block>
        <div class="violet v-preview">
          <span>&nbsp;</span>
          {{ locales[lang].preview }}
        </div>
      </a-button>
      <a-button id="deploy" shape="round" block>
        <div class="violet v-deploy">
          <span>&nbsp;</span>
          {{ locales[lang].deploy }}
        </div>
      </a-button>
    </div>
  </div>
</template>

<script lang="ts">
import {inject, defineComponent, ref} from 'vue'
import locales from "@/static/locales"
import {SystemConfig} from "@/interfaces/public/setting";
import store from "@/store/store"
import {SearchOutlined} from '@ant-design/icons-vue';

/**
 * 激活标志 从上到下依次为1,2,3,4
 */
let createActive = () => {
  let isActive = ref<number>(1)
  let active = function (id: number) {
    isActive.value = id
  }
  return {isActive, active}
}
let getLanguage = (): string => {
  let systemConfig = inject<SystemConfig>(store.systemConfig)
  let lang: string = 'zh-CN'
  if (systemConfig)
    lang = systemConfig.language
  return lang
}

export default defineComponent({
  name: 'Side',
  components: {SearchOutlined},
  setup() {
    let {isActive, active} = createActive()
    return {lang: getLanguage(), locales, isActive, active}
  }
})
</script>


<style scoped>
#box {
  height: 100vh;
  overflow: hidden;
  position: relative;
}

.menu-btn {
  margin: 10px 0;
  padding: 5px 0;
}


.menu-btn:hover {
  background-color: #e8e8e8;
}

.active {
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
