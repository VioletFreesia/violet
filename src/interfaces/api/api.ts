export interface PostApi {
    // 文章的CURD
    getAllPost: Function
    patchPost: Function
    deletePost: Function
    putPost: Function
}

export interface TagApi {
    // 标签的CURD
    getAllTag: Function
    patchTag: Function
    deleteTag: Function
    putTag: Function
}

export interface MenuApi {
    // 菜单的CURD
    getAllMenu: Function
    patchMenu: Function
    deleteMenu: Function
    putMenu: Function
}

export interface CategoryApi {
    // 分类的CURD
    getAllCategory: Function
    patchCategory: Function
    deleteCategory: Function
    putCategory: Function
}

export interface SettingApi {
    // 设置的CURD
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

export interface Api {
    postApi?: PostApi
    tagApi?: TagApi
    menuApi?: MenuApi
    categoryApi?: CategoryApi
    settingApi?: SettingApi
}
