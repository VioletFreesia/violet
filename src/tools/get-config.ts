import {inject} from 'vue'
import store from "@/store/store"
import {Globalization} from "@/interfaces/globalization/globalization"

/**
 * 获取界面语言包
 */
export const getLocale = (): Globalization => {
    return inject<Globalization>(store.locale)!
}
