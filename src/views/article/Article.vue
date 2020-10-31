<template>
  <div id="article">
    <a-row type="flex">
      <a-col span="8">
        <Post class="card"
              img="D:\Program\violet\src\assets\images\default3.jpg"
              title="重温Java之IO"
              :is-deploy="true"
              time="2020-05-31"
              category="Java"
              :is-hidden="true"/>
      </a-col>
      <a-col span="8">
        <Post class="card" img="D:\Program\violet\src\assets\images\default1.jpg"
              title="重温Java之IO"
              :is-deploy="false"
              time="2020-05-31"
              category="Java"
              :is-top="true"/>
      </a-col>
      <a-col span="8">
        <Post class="card" img="D:\Program\violet\src\assets\images\default2.jpg"
              title="重温Java之泛型"
              :is-deploy="true"
              time="2020-05-31"
              category="Java"/>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import Post from "@/views/article/components/Post.vue";

export default defineComponent({
  name: "Article",
  components: {Post},
  setup() {
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
