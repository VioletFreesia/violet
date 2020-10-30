import {Api} from "@/interfaces/api/api"
import {SystemConfig} from "@/interfaces/public/setting";

let getSystemConfig = (): SystemConfig => {
    return {appDir: '', language: 'zh-CN'}
}

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
