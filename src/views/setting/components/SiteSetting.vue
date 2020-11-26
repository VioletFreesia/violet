<template>
  <div id="site-setting">
    <setting-layout>
      <template #side>
        <div class="side">
          <a-anchor wrapperClass="test"
                    :get-container="test">
            <a-anchor-link href="#test01" title="Basic demo"/>
            <a-anchor-link href="#test02" title="Static demo"/>
            <a-anchor-link href="#test03" title="API"></a-anchor-link>
          </a-anchor>
        </div>
      </template>
      <template #default>
        <div class="site-setting-items">
          <div id="test01" class="box">test01</div>
          <div id="test02" class="box">test02</div>
          <div id="test03" class="box">test03</div>
          <div id="test04" class="box">test04</div>
        </div>
      </template>
    </setting-layout>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import SettingLayout from '@/views/setting/components/SettingLayout.vue'

export default defineComponent({
  name: "SiteSetting",
  components: {SettingLayout},
  methods: {
    test() {
      return document.querySelector('#site-setting-items')
    }
  }
})
</script>

<style scoped>
#site-setting {
  height: 100%;
}

.side {
  height: 100%;
  background-color: violet;
}

.site-setting-items {
  height: 100%;
  overflow: scroll;
}

.box {
  height: 300px;
  margin: 10px;
  background-color: pink;
}
</style>