import {Globalization} from "@/interfaces/globalization/globalization"
import {zh_CN} from './zh-CN'

// 设置对象的key为string类型
interface StringObjectKeys {
    [key: string]: Globalization
}

// 已经支持的语言列表
export enum LanguageList {
    zh_CN = 'zh_CN'
}

// 国际化语言包汇总
export const globalization: StringObjectKeys = {
    'zh_CN': zh_CN
}
