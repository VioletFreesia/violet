export default interface Event {
    eventName: string
}

export interface EventHandler {
    event: Event
    handler: Function
}

//文章属性相关操作事件
export interface PostInfoEvent {
    Top: Event         //置顶文章,传递数组
    UnTop: Event       //取消置顶,传递数组
    Hide: Event        //隐藏文章,传递数组
    UnHide: Event      //取消隐藏,传递数组
    Deploy: Event      //修改文章状态为发布
    UnDeploy: Event    //修改文章状态为保存
    Modify: Event      //修改某篇文章的属性
    Delete: Event      //将文章移入回收站,传递数组
    GetAll: Event      //获取所有文章信息
}

//文章内容相关操作事件
export interface PostContentEvent {
    Get: Event     //获取某篇文章的内容
    Create: Event  //新建一篇文章
    Modify: Event  //修改一篇文章
    Delete: Event  //删除文章, 真正的删除,无法恢复
}

export interface SettingsEvent {
    GetSystemConfig: Event  //获取系统设置
    GetSiteConfig: Event    //获取网站配置
}

//所有事件集合
export interface Events {
    postInfoEvent: PostInfoEvent
    postContentEvent: PostContentEvent
    settingEvent: SettingsEvent
}