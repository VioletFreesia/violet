import {Globalization, Side, PostCard} from "@/interfaces/globalization/globalization"

const side: Side = {
    preview: '预 览',
    deploy: '同 步',
    article: '文 章',
    menu: '菜 单',
    tag: '标 签',
    category: '分 类',
    theme: '主 题',
    settings: '设 置',
}

const postCard: PostCard = {
    deployStatus: '已发布',
    saveStatus: '已保存',
    unPublish: '取消发布',
    postArticle: '发布文章',
    unHide: '取消隐藏',
    hideArticle: '隐藏文章',
    topArticle: '置顶文章',
    unPink: '取消置顶',
    deleteArticle: '删除文章',
    modifyProperties: '修改属性',
    bulkOperation: '批量操作',
}


export const zh_CN: Globalization = {
    side,
    postCard
}
