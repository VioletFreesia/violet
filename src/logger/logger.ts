import log4js from 'log4js'
import os from 'os'
import path from 'path'

let config = {
    appenders: [''],
    level: ''
}

if (process.env.NODE_ENV !== 'development') {
    config.appenders = ['toFile']    //生产环境才输出到文件
    config.level = 'error'
} else {
    config.appenders = ['default']   //测试环境输出到控制台
    config.level = 'debug'
}

log4js.configure({
    appenders: {
        default: {
            type: "console",
        },
        toFile: {
            type: "file",
            filename: path.join(os.homedir(), '.violet/log/error.log')
        }
    },
    categories: {
        default: config,
        electronApp: config,
        violetApp: config,
        eventHandler: config
    }
})

/**
 * 日志分类
 */
export enum Categories {
    VioletApp = 'violetApp',
    EventHandler = 'eventHandler',
    ElectronApp = 'electronApp'
}

export let Logger = (category: Categories) => {
    return log4js.getLogger(category)
}