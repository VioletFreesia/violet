import {Globalization} from "@/interfaces/globalization/globalization"
import {zh_CN} from './zh-CN'

interface StringObjectKeys {
    [key: string]: Globalization
}

export enum LanguageList {
    zh_CN = 'zh_CN'
}

export const globalization: StringObjectKeys = {
    'zh_CN': zh_CN
}
