import {Globalization, Side, PostCard, PostEditor} from "@/interfaces/globalization/globalization"

const side: Side = {
    preview: '预 览',
    deploy: '同 步',
    article: '文 章',
    page: '页 面',
    recycleBin: '回 收 站',
    category: '分 类',
    theme: '主 题',
    settings: '设 置',
}

const postCard: PostCard = {
    deployStatus: '已发布',
    saveStatus: '已保存',
    unDeploy: '取消发布',
    deployArticle: '发布文章',
    unHide: '取消隐藏',
    hideArticle: '隐藏文章',
    topArticle: '置顶文章',
    unTop: '取消置顶',
    deleteArticle: '删除文章',
    modifyProperties: '修改属性',
    batchOperation: '批量操作',
    quitBatchOperation: '退出操作'
}

const postEditor: PostEditor = {
    insertImage: "插入图片",
    quit: "退出",
    save: "保存",
    inputImagePath: '输入图片路径'
}


export const zh_CN: Globalization = {
    side,
    postCard,
    postEditor
}
