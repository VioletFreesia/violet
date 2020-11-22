<template>
  <div id="article-editor">
    <div id="vditor"></div>
  </div>
</template>
<script lang="ts">
import {defineComponent, inject, Ref, onMounted} from 'vue'
import {WindowName} from "@/static/enums"
import Vditor from "vditor"
import store from "@/store/store"
import {message} from 'ant-design-vue'
import {getLocale} from "@/tools/get-config"
import $ from "jquery"


let getToolBarConfig = (option: {
  quitText: string
  quitCallback: (status?: boolean | undefined) => void
  saveText: string
  saveCallback: (status?: boolean | undefined) => void
  insertImageText: string
  insertImageCallback: (status?: boolean | undefined) => void
}) => {
  return [
    {
      hotkey: '',
      name: 'quit',
      tipPosition: 'nw',
      tip: option.quitText,
      className: 'violet-btn',
      click: option.quitCallback
    },
    {
      hotkey: 'ctrl-s',
      name: 'save',
      tipPosition: 'nw',
      tip: option.saveText,
      className: 'violet-btn',
      click: option.saveCallback
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
      tip: option.insertImageText,
      className: 'violet-btn',
      click: option.insertImageCallback
    },
    '|',
    'outline',
    'code-theme',
    'export',
    'edit-mode'
  ]
}

export default defineComponent({
  name: "ArticleEditor",
  props: {
    isNewFile: {
      type: Boolean,
      default: false
    }
  },
  methods: {},
  setup() {
    // 获取文章编辑界面语言包
    let locale = getLocale().postEditor
    // 获取当前窗口
    let currentAppWindow = inject<Ref<WindowName>>(store.currentAppWindow)!
    // 声明编辑器对象
    let Editor: Vditor
    // 返回主界面函数
    let back = () => {
      currentAppWindow.value = WindowName.Home
    }
    // 保存文章
    let save = () => {
      message.success('保存成功')
    }
    // 大纲滚动函数
    let scrollTo = (id: string) => {
      let top = $('#' + id).offset()!.top //还需要滚的距离
      let p = $('.vditor-ir pre.vditor-reset').offset()!.top //已经滚出去的距离
      if (Math.floor(top).toFixed(0) !== '110') {
        $('.vditor-ir').animate({
          scrollTop: -p + top //总共需要滚的距离为已经滚出去的绝对值+还需要滚的
        }, 500)
      }
    }
    onMounted(() => {
      let toolbarConfig = getToolBarConfig({
        insertImageText: locale.insertImage,
        quitText: locale.quit,
        saveText: locale.save,
        quitCallback: back,
        insertImageCallback() {
          Editor.insertValue(`![](${locale.inputImagePath})`)
        },
        saveCallback: save
      })
      Editor = new Vditor('vditor', {
        toolbar: toolbarConfig,
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
          // 为大纲注册点击滚动事件
          $('.vditor-outline').on('click', 'div[data-id]', () => {
            let target = $('div.vditor-outline__item.vditor-outline__item--current')
                .attr('data-id')
            if (target)
              scrollTo(target)
          })
          // 为自定义按钮添加图标
          $('.violet-btn button[data-type=save]')
              .html('<div class="violet v-editor-save"></div>')
          $('.violet-btn button[data-type=quit]')
              .html('<div class="violet v-editor-quit"></div>')
          $('.violet-btn button[data-type=image]')
              .html('<div class="violet v-picture"></div>')
          Editor.setValue('书写你的心情')
        }
      })
    })
    return {
      currentAppWindow,
      locale
    }
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
