// 文章的CURD
export interface PostApi {
    getAllPost: Function
    patchPost: Function
    deletePost: Function
    putPost: Function
}

// 标签的CURD
export interface TagApi {
    getAllTag: Function
    patchTag: Function
    deleteTag: Function
    putTag: Function
}

// 菜单的CURD
export interface MenuApi {
    getAllMenu: Function
    patchMenu: Function
    deleteMenu: Function
    putMenu: Function
}

// 分类的CURD
export interface CategoryApi {
    getAllCategory: Function
    patchCategory: Function
    deleteCategory: Function
    putCategory: Function
}

// 设置的CURD
export interface SettingApi {
    getAllSetting: Function
    getSiteConfig: Function
    getThemeConfig: Function
    getRemoteConfig: Function
    getCommentConfig: Function
    getSystemConfig: Function
    patchSiteConfig: Function
    patchThemeConfig: Function
    patchRemoteConfig: Function
    patchCommentConfig: Function
    patchSystemConfig: Function
}

// 渲染进程与主进程通信的api整合
export interface Api {
    postApi?: PostApi
    tagApi?: TagApi
    menuApi?: MenuApi
    categoryApi?: CategoryApi
    settingApi?: SettingApi
}
