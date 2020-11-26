// 分类接口
export interface Category {
    name: string            //分类名称 唯一标识
    parent: Category | null //父分类
    subCategory: Category[] //子分类
    posts: string[]         //该分类下的文章 文章id的列表
}
