import {SystemConfig, SiteConfig} from "@/interfaces/public/setting"
import {readJsonFile} from "@/tools/tools"

export class VioletApp {
    private _systemConfig: SystemConfig
    private _siteConfig: SiteConfig

    constructor(systemConfig: SystemConfig) {
        this._systemConfig = systemConfig
        this._siteConfig = readJsonFile('siteConfig')
    }
}