// 各枚举类
// 各窗口代码
export enum WindowName {
    Home,       //首页
    PostEditor, //文章编辑界面
    Article,    //首页文章界面
    Page,       //首页菜单界面
    RecycleBin, //首页回收站界面
    Category,   //首页分类界面
    Setting     //首页设置界面
}

// 文章卡片触发的操作名
export enum PostCardOperationType {
    UnDeploy,          //取消发布
    DeployArticle,        //发布文章
    UnHide,             //取消隐藏
    HideArticle,        //隐藏文章
    TopArticle,         //置顶文章
    UnTop,             //取消置顶
    DeleteArticle,      //删除文章
    ModifyProperties,   //修改属性
    EditPost,           //编辑/查看文章
    BatchOption,        //批量编辑
    QuitBatchOption    //退出批量编辑
}
