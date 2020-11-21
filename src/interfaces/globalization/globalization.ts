// 侧边栏国际化接口
export interface Side {
    preview: string
    deploy: string
    article: string
    page: string
    recycleBin: string
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

export interface PostEditor {
    quit: string
    save: string
    insertImage: string
    inputImagePath: string
}

// 整个软件国际化接口
export interface Globalization {
    side: Side
    postCard: PostCard
    postEditor: PostEditor
}
