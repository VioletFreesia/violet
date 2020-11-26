// 主题配置
export interface ThemeConfigItem {
    // TODO: 待完成主题开发者自定义配置的每一项
}

// 网站配置
export interface SiteConfig {
    themeName: string           //主题名字
    postPageSize: number        //首页单页文章数量  默认10
    archivesPageSize: number    //归档页单页文章数量 默认10
    siteName: string            //网站名字  默认violet
    siteDescription: string     //网站描述  默认 "好记性不如烂'笔头'"
    faviconPath: string         //logo路径 不能更改 /favicon.png
    avatarPath: string          //头像路径  不能更改 /avatar.png
    archivesPath: string        //归档路径 默认/archive
    postPath: string            //文章路径 默认/posts
    tagPath: string             //标签路径 默认/tags
    categoryPath: string        //分类路径 默认/categories
}

// 远程配置
export interface RemoteConfig {
    // TODO: 待完善远程配置
}

// 评论配置
export interface CommentConfig {
    // TODO: 待完善评论配置
}

// 系统配置
export interface SystemConfig {
    workplace: string   //软件的工作目录
    language: string    //软件的界面语言
}
