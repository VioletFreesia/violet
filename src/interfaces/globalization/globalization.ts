// 侧边栏国际化接口
export interface Side {
    preview: string
    deploy: string
    article: string
    menu: string
    tag: string
    category: string
    theme: string
    settings: string
}

// 文章卡片国际化接口
export interface PostCard {
    deployStatus: string
    saveStatus: string
    unPublish: string
    postArticle: string
    unHide: string
    hideArticle: string
    topArticle: string
    unPink: string
    deleteArticle: string
    modifyProperties: string
    bulkOperation: string
}

// 整个软件国际化接口
export interface Globalization {
    side: Side
    postCard: PostCard
}
