import {Api} from "@/interfaces/api/api"
import {SystemConfig} from "@/interfaces/public/setting";

let getSystemConfig = (): SystemConfig => {
    return {appDir: '', language: 'zh-CN'}
}

// 主进程与渲染进程通信api的具体实现
const api: Api = {
    settingApi: {
        getAllSetting: () => {
        },
        getSiteConfig: () => {
        },
        getThemeConfig: () => {
        },
        getRemoteConfig: () => {
        },
        getCommentConfig: () => {
        },
        getSystemConfig,
        patchSiteConfig: () => {
        },
        patchThemeConfig: () => {
        },
        patchRemoteConfig: () => {
        },
        patchCommentConfig: () => {
        },
        patchSystemConfig: () => {
        },
    }
}
export default api
