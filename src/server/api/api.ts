import {PostInfo} from "@/interfaces/public/post"
import {Event} from "@/interfaces/event/event"
import events from "@/instance/event/event"
import {ipcRenderer} from 'electron'
import {PostCardOperationType} from "@/instance/enum/enums"

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

// 文章信息修改函数工厂
let postInfoHandleFactory = (event: Event) => {
    return (postIds: string[]): Promise<boolean> => {
        return request<boolean>(event, postIds)
    }
}

// 将多篇文章放入回收站
let deletePosts = postInfoHandleFactory(events.postInfoEvent.Delete)
// 将多篇文章从回收站恢复
let UnDeletePosts = postInfoHandleFactory(events.postInfoEvent.UnDelete)
// 取消置顶多篇文章
let unTopPosts = postInfoHandleFactory(events.postInfoEvent.UnTop)
// 置顶多篇文章
let topPosts = postInfoHandleFactory(events.postInfoEvent.Top)
// 隐藏多篇文章
let hidePosts = postInfoHandleFactory(events.postInfoEvent.Hide)
// 取消隐藏多篇文章
let unHidePosts = postInfoHandleFactory(events.postInfoEvent.UnHide)
// 发布多篇文章
let deployPosts = postInfoHandleFactory(events.postInfoEvent.Deploy)
// 取消发布多篇文章
let unDeployPosts = postInfoHandleFactory(events.postInfoEvent.UnDeploy)

let postInfoHandle = (operationType: PostCardOperationType) => {
    switch (operationType) {
        case PostCardOperationType.DeleteArticle:
            return deletePosts
        case PostCardOperationType.UnTop:
            return unTopPosts
        case PostCardOperationType.TopArticle:
            return topPosts
        case PostCardOperationType.HideArticle:
            return hidePosts
        case PostCardOperationType.UnHide:
            return unHidePosts
        case PostCardOperationType.DeployArticle:
            return deployPosts
        case PostCardOperationType.UnDeploy:
            return unDeployPosts
    }
}

// 主进程与渲染进程通信api的具体实现
const api = {
    postApi: {
        getAllPostInfo,
        postInfoHandle
    },
    settingApi: {
        getSystemConfig,
    }
}
export default api
