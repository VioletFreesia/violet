import {PostInfo} from "@/interfaces/public/post"
import Event from "@/interfaces/event/event"
import events from "@/instance/event/event"
import {ipcRenderer} from 'electron'

let request = (event: Event, data: object | null = null) => {
    return new Promise(resolve => {
        resolve(ipcRenderer.sendSync(event.eventName, data))
    })
}

let getAllPostInfo = (): PostInfo[] => {
    return ipcRenderer.sendSync(events.postInfoEvent.GetAll.eventName)
}

let getSystemConfig = () => {
    return ipcRenderer.sendSync(events.settingEvent.GetSystemConfig.eventName)
}


// 主进程与渲染进程通信api的具体实现
const api = {
    postApi: {
        getAllPostInfo,
    },
    settingApi: {
        getSystemConfig,
    }
}
export default api
