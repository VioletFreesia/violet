import {SystemConfig} from "@/interfaces/public/setting"
import eventHandlerRegister from "@/server/event-handler/event-handler"

export class VioletApp {
    private _systemConfig: SystemConfig

    constructor(systemConfig: SystemConfig) {
        this._systemConfig = systemConfig
        // 注册事件
        eventHandlerRegister(this)
        console.log("violetApp已启动")
    }

    set systemConfig(value: SystemConfig) {
        this._systemConfig = value;
    }

    get systemConfig(): SystemConfig {
        return this._systemConfig;
    }
}