import {inject} from 'vue'
import {SystemConfig} from "@/interfaces/public/setting";
import store from "@/store/store"

/**
 * 获取当前的语言
 */
export const getLanguage = (): string => {
    let systemConfig = inject<SystemConfig>(store.systemConfig)
    let lang: string = 'zh-CN'
    if (systemConfig)
        lang = systemConfig.language
    return lang
}
