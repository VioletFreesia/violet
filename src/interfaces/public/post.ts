// 文章数据的接口
export interface PostData {
    title: string
    date: string
    published: boolean
    hideInList: boolean
    tags?: []
    feature: string
    isTop: boolean
}

//文章的接口
export interface Post {
    content: string

    data: PostData

    fileName: string
}
