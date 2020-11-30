import {PostInfo} from "@/interfaces/public/post"
import Event from "@/interfaces/event/event"
import events from "@/instance/event/event"
import {ipcRenderer} from 'electron'

let request = <T>(event: Event, data: object | null = null) => {
    return new Promise<T>((resolve, reject) => {
        try {
            resolve(ipcRenderer.sendSync(event.eventName, data))
        } catch (e) {
            reject(e)
        }
    })
}
// 获取系统配置 必须同步获取，确保在进入软件主界面之前就成功获取
let getSystemConfig = () => {
    return ipcRenderer.sendSync(events.settingEvent.GetSystemConfig.eventName)
}

// 文章信息异步获取
let getAllPostInfo = (): Promise<PostInfo[]> => {
    return request<PostInfo[]>(events.postInfoEvent.GetAll)
}
// 将多篇文章放入回收站
let deletePosts = (postIds: string[]): Promise<PostInfo[]> => {
    return request<PostInfo[]>(events.postInfoEvent.Delete, postIds)
}

// 主进程与渲染进程通信api的具体实现
const api = {
    postApi: {
        getAllPostInfo,
        deletePosts
    },
    settingApi: {
        getSystemConfig,
    }
}
export default api
