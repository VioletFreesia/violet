<template>
  <div id="setting-layout">
    <a-row type="flex" class="content">
      <a-col class="content" :span="4">
        <div class="side">
          <slot name="side"></slot>
        </div>
      </a-col>
      <a-col class="content" :span="20">
        <div class="setting-items">
          <slot></slot>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  name: "SettingLayout"
}
</script>

<style scoped>
.side,
.content,
.setting-items,
#setting-layout {
  height: 100%;
  overflow: hidden;
}
</style>