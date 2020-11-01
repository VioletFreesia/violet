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

export interface Globalization {
    side: Side
    postCard: PostCard
}
