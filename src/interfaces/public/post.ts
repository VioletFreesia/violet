import {Category} from "@/interfaces/public/category"

// 文章数据的接口
export interface PostInfo {
    id: string          //文章id, 为创建该篇文章的时间戳
    title: string       //文章标题
    img: string         //文章封面
    tags: string[]      //文章标签
    category: Category  //文章分类
    modifyDate: string  //文章最后一次修改时间
    isDeploy: boolean   //文章是否发布
    isTop: boolean      //文章是否置顶
    isHide: boolean     //文章是否隐藏
    isSelected: boolean //文章是否被选中
    fileName: string    //文章的本地文件名
}

//文章内容数据
export interface PostContent {
    content: string     //文章的内容,ejs渲染前为markdown格式,渲染后为html格式
    description: string //文章描述,自动截取文章的开始内容,无格式
    words: number       //文章字数
}

//文章的接口
export interface Post {
    postInfo: PostInfo
    postContent: PostContent
}
