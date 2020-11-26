import {ipcMain, IpcMainEvent} from 'electron'
import events from "@/instance/event/event"
import {EventHandler} from "@/interfaces/event/event"
import {VioletApp} from "@/server/violet-app"


let eventHandlers: EventHandler[] = []

// 获取软件系统配置
eventHandlers.push({
    event: events.settingEvent.GetSystemConfig,
    handler: async (event: IpcMainEvent, args: any, violetApp: VioletApp) => {
        console.log("获取系统语言")
        event.returnValue = violetApp.systemConfig
    }
})

let eventHandlerRegister = (violetApp: VioletApp) => {
    // 为每个事件注册监听处理器
    eventHandlers.forEach(eventHandle => {
        // 注册监听器之前先移除已有的监听器 防bug
        ipcMain.removeAllListeners(eventHandle.event.eventName)
        ipcMain.on(eventHandle.event.eventName, (event, args) => {
            eventHandle.handler(event, args, violetApp)
        })
    })
}

export default eventHandlerRegister

