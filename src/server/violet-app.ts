import {SystemConfig} from "@/interfaces/public/setting"
import eventHandlerRegister from "@/server/event-handler/event-handler"
import {PostInfo} from "@/interfaces/public/post"
import JsonDB from "@/tools/jsondb"
import {Categories, Logger} from "@/logger/logger"
import path from 'path'

export class VioletApp {
    logger = Logger(Categories.VioletApp)
    private _systemConfig: SystemConfig     //系统配置
    private _postInfoDB: JsonDB | undefined   //文章基本信息数据库

    constructor(systemConfig: SystemConfig) {
        this._systemConfig = systemConfig
        // 注册事件
        eventHandlerRegister(this)
        if (process.env.NODE_ENV === 'development') {
            let fs = require('fs')
            fs.readFile(systemConfig.workspace + '/logo.txt',
                (err: any, data: any) => {
                    if (!err) {
                        console.log(data.toString())
                    }
                })
        }
    }

    /**
     * 设置系统配置
     * @param value
     */
    set systemConfig(value: SystemConfig) {
        this._systemConfig = value
    }

    /**
     * 获取系统配置
     */
    get systemConfig(): SystemConfig {
        return this._systemConfig
    }

    /**
     * 获取文章信息相关数据库
     */
    get postInfoDB(): JsonDB {
        // 仅在第一次访问时创建
        if (!this._postInfoDB) {
            let postInfoPath = path.join(this._systemConfig.workspace,
                '.violet/post-info.json')
            this._postInfoDB = new JsonDB(postInfoPath)
        }
        return this._postInfoDB
    }

    /**
     * 获取所有文章信息
     */
    postInfo(): PostInfo[] {
        return this.postInfoDB.row().postInfos
    }
}