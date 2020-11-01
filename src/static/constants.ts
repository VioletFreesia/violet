// 常量存放
// 各窗口代码
export enum WindowName {
    Home,       //首页
    PostEditor, //文章编辑界面
    Article,    //首页文章界面
    Menu,       //首页菜单界面
    Tag,        //首页标签界面
    Category,   //首页分类界面
    Setting     //首页设置界面
}

// 文章卡片触发的操作名
export enum PostCardOperationType {
    UnPublish,          //取消发布
    PostArticle,        //发布文章
    UnHide,             //取消隐藏
    HideArticle,        //隐藏文章
    TopArticle,         //置顶文章
    UnPink,             //取消置顶
    DeleteArticle,      //删除文章
    ModifyProperties,   //修改属性
    Selected,           //被选中
    UnSelect            //取消选中
}

