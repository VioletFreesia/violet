// 系统配置
const systemConfig = Symbol()
// 当前app窗口界面
const currentAppWindow = Symbol()
// 当前非文章编辑页的窗口界面
const currentHomeWindow = Symbol()
// 界面语言包
const locale = Symbol()
// 是否为批量编辑模式
const isBatch = Symbol()
// 所有文章信息
const postInfos = Symbol()
// 以编辑模式打开文章的文件名
const filename = Symbol()
// 打开编辑器的模式
const isEdit = Symbol()
// 界面全局变量登记
export default {
    systemConfig,
    currentAppWindow,
    currentHomeWindow,
    locale,
    article: {
        isBatch,
        postInfos,
        filename,
        isEdit
    }
}
