import {ipcMain, IpcMainEvent} from 'electron'
import events from "@/instance/event/event"
import {EventHandler} from "@/interfaces/event/event"
import {VioletApp} from "@/server/violet-app"
import {Categories, Logger} from "@/logger/logger"
import {PostInfo} from "@/interfaces/public/post";

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
            let temp = violetApp.postInfo()
            let postInfos: PostInfo[] = []
            temp.forEach(postInfo => {
                // 过滤已经放入回收站的文章
                if (!postInfo.isDeleted) {
                    postInfos.push(postInfo)
                }
            })
            event.returnValue = postInfos
        } else {
            event.returnValue = []
        }
    }
})

eventHandlers.push({
    event: events.postInfoEvent.Delete,
    handler: async (event: IpcMainEvent, args: any, violetApp: VioletApp) => {
        logger.info('删除文章', args)
        args.forEach((id: string) => {
            violetApp.postInfoDB
                .update('postInfos', {id},
                    {'isDeleted': true}).commit()
        })
        let temp = violetApp.postInfo()
        let postInfos: PostInfo[] = []
        temp.forEach(postInfo => {
            // 过滤已经放入回收站的文章
            if (!postInfo.isDeleted) {
                postInfos.push(postInfo)
            }
        })
        event.returnValue = postInfos
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

