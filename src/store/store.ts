// 系统配置
const systemConfig = Symbol()
// 当前app窗口界面
const currentAppWindow = Symbol()
// 当前非文章编辑页的窗口界面
const currentHomeWindow = Symbol()
// 界面语言包
const locale = Symbol()
// 界面全局变量登记
export default {
    systemConfig,
    currentAppWindow,
    currentHomeWindow,
    locale
}
