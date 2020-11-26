// 网站页面的接口
export interface Page {
    name: string            //页面名称 唯一标识
    openType: string        //打开方式
    subPages?: Page[]       //子页面
    linkedTemplate: string  //关联的模板名称 该模板必须在主题目录的template下 不能在起子目录
    linkedPost: string      //关联的文章页面
}
