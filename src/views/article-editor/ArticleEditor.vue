<template>
  <div id="article-editor">
    <div id="vditor"></div>
  </div>
</template>
<script lang="ts">
import {defineComponent, inject} from 'vue'
import {WindowName} from "@/static/enums"
import Vditor from "vditor"
import store from "@/store/store"
import {emoji} from "@/static/emoji"
import {PostEditor, Globalization} from "@/interfaces/globalization/globalization"
import {message} from 'ant-design-vue'
import $ from "jquery"

export default defineComponent({
  name: "ArticleEditor",
  props: {
    isNewFile: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      contentEditor: Vditor
    }
  },
  mounted() {
    new Promise(resolve => {
      let toolbar = [
        {
          hotkey: '',
          name: 'quit',
          tipPosition: 'nw',
          tip: this.locale.quit,
          className: 'violet-btn',
          click: () => {
            this.back()
          }
        },
        {
          hotkey: 'ctrl-s',
          name: 'save',
          tipPosition: 'nw',
          tip: this.locale.save,
          className: 'violet-btn',
          click: () => {
            message.success('保存成功')
          }
        },
        'undo',
        'redo',
        '|',
        'emoji',
        'headings',
        'bold',
        'italic',
        'strike',
        '|',
        'line',
        'quote',
        'check',
        'list',
        'ordered-list',
        'outdent',
        'indent',
        '|',
        'code',
        'inline-code',
        'link',
        'table',
        {
          hotkey: 'ctrl-p',
          name: 'image',
          tipPosition: 'nw',
          tip: this.locale.insertImage,
          className: 'violet-btn',
          click: () => {
            // @ts-ignore
            this.contentEditor.insertValue(`![](${this.locale.inputImagePath})`)
          }
        },
        '|',
        'outline',
        'code-theme',
        'export',
        'edit-mode'
      ]
      // @ts-ignore
      this.contentEditor = new Vditor('vditor', {
        toolbar,
        counter: {
          enable: true,
          type: 'text'
        },
        cache: {
          enable: false,
        },
        outline: true,
        preview: {
          maxWidth: 1200
        },
        after() {
          resolve(true)
        }
      })
    }).then(() => {
      // 为大纲条目注册点击事件
      $('.vditor-outline').on('click', 'div[data-id]', () => {
        let target = $('div.vditor-outline__item.vditor-outline__item--current')
            .attr('data-id')
        if (target)
          this.scrollTo(target)
      })
      // 为自定义按钮添加图标
      $('.violet-btn button[data-type=save]')
          .html('<div class="violet v-editor-save"></div>')
      $('.violet-btn button[data-type=quit]')
          .html('<div class="violet v-editor-quit"></div>')
      $('.violet-btn button[data-type=image]')
          .html('<div class="violet v-picture"></div>')
    })
  },
  methods: {
    back() {
      this.currentAppWindow = WindowName.Home
    },
    scrollTo(id: string) {
      let top = $('#' + id).offset()!.top //还需要滚的距离
      let p = $('.vditor-ir pre.vditor-reset').offset()!.top //已经滚出去的距离
      if (Math.floor(top).toFixed(0) !== '110') {
        $('.vditor-ir').animate({
          scrollTop: -p + top //总共需要滚的距离为已经滚出去的绝对值+还需要滚的
        }, 500)
      }
    },
  },
  setup() {
    let locale: PostEditor = inject<Globalization>(store.locale)!.postEditor
    let currentAppWindow = inject<WindowName>(store.currentAppWindow)!
    return {currentAppWindow, locale}
  }
})
</script>

<style scoped>
#article-editor {
  padding-top: 30px;
  width: 100%;
  height: 100%;
}

.violet {
  line-height: 40px;
}

</style>

<style lang="scss">
@import "~vditor/src/assets/scss/index";

.vditor {
  width: 100%;
  height: 100%;
}

.vditor-ir {
  overflow: auto;
}

.vditor-ir pre.vditor-reset {
  height: auto;
  min-height: 100%;
}
</style>