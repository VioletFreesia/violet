import {SystemConfig} from "@/interfaces/public/setting"
import eventHandlerRegister from "@/server/event-handler/event-handler"
import {PostInfo} from "@/interfaces/public/post"
// import path from 'path'

export class VioletApp {
    private _systemConfig: SystemConfig     //系统配置
    // private _postInfoDB: JsonDB | undefined   //文章基本信息数据库

    constructor(systemConfig: SystemConfig) {
        this._systemConfig = systemConfig
        // 注册事件
        eventHandlerRegister(this)
        console.log("violetApp已启动")
    }

    set systemConfig(value: SystemConfig) {
        this._systemConfig = value
    }

    get systemConfig(): SystemConfig {
        return this._systemConfig
    }

    // get postInfoDB(): JsonDB | undefined {
    //     // 仅在第一次访问时创建
    //     if (!this._postInfoDB) {
    //         let postInfoPath = path.join(this._systemConfig.workplace,
    //             '.violet/post-info.json')
    //         this._postInfoDB = new JsonDB(postInfoPath)
    //     }
    //     return this._postInfoDB
    // }

    get postInfo(): PostInfo[] {
        return []
    }
}