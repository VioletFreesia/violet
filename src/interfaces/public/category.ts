export interface Category {
    name: string
    parent: Category | null
    subCategory: Category[]
    postId: string[]
}
