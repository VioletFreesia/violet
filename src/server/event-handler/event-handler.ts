import {ipcMain, IpcMainEvent} from 'electron'
import events from "@/instance/event/event"
import {EventHandler, Event} from "@/interfaces/event/event"
import {VioletApp} from "@/server/violet-app"
import {Categories, Logger} from "@/logger/logger"

let logger = Logger(Categories.EventHandler)
let eventHandlers: EventHandler[] = []

// 获取软件系统配置
eventHandlers.push({
    event: events.settingEvent.GetSystemConfig,
    handler: async (event: IpcMainEvent, args: any, violetApp: VioletApp) => {
        logger.debug('获取系统配置，工作目录:', violetApp.systemConfig.workspace)
        event.returnValue = violetApp.systemConfig
    }
})

// 获取文章信息
eventHandlers.push({
    event: events.postInfoEvent.GetAll,
    handler: async (event: IpcMainEvent, args: any, violetApp: VioletApp) => {
        logger.debug('获取文章信息')
        // 只有在工作目录不为空的情况下才能获取文章信息
        if (violetApp.systemConfig.workspace !== '') {
            event.returnValue = violetApp.postInfo()
        } else {
            event.returnValue = []
        }
    }
})

// 文章信息处理函数的生产工厂
let postInfoEventHandlerFactory = (postInfoEvent: Event, value: object, logMsg: string) => {
    return {
        event: postInfoEvent,
        handler: async (event: IpcMainEvent, postIds: any, violetApp: VioletApp) => {
            logger.info(logMsg, postIds)
            postIds.forEach((id: string) => {
                violetApp.postInfoDB
                    .update('postInfos', {id},
                        value).commit()
            })
            event.returnValue = true
        }
    }
}

eventHandlers.push(postInfoEventHandlerFactory(events.postInfoEvent.Delete,
    {isDeleted: true}, '删除文章'))
eventHandlers.push(postInfoEventHandlerFactory(events.postInfoEvent.UnDelete,
    {isDeleted: false}, '恢复文章'))
eventHandlers.push(postInfoEventHandlerFactory(events.postInfoEvent.UnTop,
    {isTop: true}, '取消置顶文章'))
eventHandlers.push(postInfoEventHandlerFactory(events.postInfoEvent.Top,
    {isTop: true}, '置顶文章'))
eventHandlers.push(postInfoEventHandlerFactory(events.postInfoEvent.Hide,
    {isHide: true}, '隐藏文章'))
eventHandlers.push(postInfoEventHandlerFactory(events.postInfoEvent.UnHide,
    {isHide: true}, '取消隐藏文章'))
eventHandlers.push(postInfoEventHandlerFactory(events.postInfoEvent.Deploy,
    {isDeploy: true}, '发布文章'))
eventHandlers.push(postInfoEventHandlerFactory(events.postInfoEvent.UnDeploy,
    {isDeploy: true}, '取消发布文章'))

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

