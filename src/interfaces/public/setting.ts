// 主题配置
export interface ThemeConfig {
}

// 网站配置
export interface SiteConfig {
    themeName: string
    postPageSize: number
    archivesPageSize: number
    siteName: string
    siteDescription: string
    footerInfo: string
    showFeatureImage: boolean
    postUrlFormat: string
    tagUrlFormat: string
    dateFormat: string
    feedFullText: boolean
    feedCount: number
    faviconPath: string
    avatarPath: string
    archivesPath: string
    postPath: string
    tagPath: string
}

// 远程配置
export interface RemoteConfig {
    platform: 'github' | 'coding' | 'sftp'
    domain: string
    repository: string
    branch: string
    username: string
    email: string
    tokenUsername: string
    token: string
    cname: string
    port: string
    server: string
    password: string
    privateKey: string
    remotePath: string

    [index: string]: string
}

// 评论配置
export interface CommentConfig {
    commentPlatform: string
    showComment: boolean
}

// 系统配置
export interface SystemConfig {
    appDir: string
    language: string
}

// 整个设置
export default interface Setting {
    siteConfig: SiteConfig
    themeConfig: ThemeConfig
    remoteConfig: RemoteConfig
    commentConfig: CommentConfig
    systemConfig: SystemConfig
}
