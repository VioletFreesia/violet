<template>
  <div id="site-setting">
    <setting-layout>
      <template #side>
        <div class="side">
          <a-anchor wrapperClass="test"
                    :get-container="getContainer"
                    :get-current-anchor="()=>'#test01'"
                    @click="preventDefault">
            <a-anchor-link href="#test01" title="Basic demo"/>
            <a-anchor-link href="#test02" title="Static demo"/>
            <a-anchor-link href="#test03" title="API"></a-anchor-link>
          </a-anchor>
        </div>
      </template>
      <template #default>
        <div id="site-setting-items">
          <a-form :layout="'vertical'" >
            <a-form-item label="Field A">
              <a-input placeholder="input placeholder" />
            </a-form-item>
            <a-form-item label="Field B">
              <a-input  placeholder="input placeholder" />
            </a-form-item>
          </a-form>
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
  setup() {
    let getContainer = () => document.querySelector('#site-setting-items')
    let preventDefault = (e: Event) => e.preventDefault()
    return {
      getContainer,
      preventDefault
    }
  }
})
</script>

<style scoped>
#site-setting {
  height: 100%;
}

.side {
  padding-left: 3px;
  height: 100%;
}

#site-setting-items {
  height: 100%;
  overflow: scroll;
  padding-bottom: 100px;
}
</style>