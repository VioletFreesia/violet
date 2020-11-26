import {BatchOperationMenu, ChangeHomeWindowMenu} from "@/interfaces/side/side-menu"
import {PostCard, Side} from "@/interfaces/globalization/globalization"
import {PostCardOperationType, WindowName} from "@/instance/enum/enums"
// 获得批量编辑菜单
export let batchOptionMenu = (locale: PostCard): BatchOperationMenu[] => {
    return [
        {
            text: locale.deployArticle,
            type: 'click',
            operationType: PostCardOperationType.DeployArticle,
            iconName: 'v-deploy'
        },
        {
            text: locale.topArticle,
            type: 'click',
            operationType: PostCardOperationType.TopArticle,
            iconName: 'v-top'
        },
        {
            text: locale.hideArticle,
            type: 'click',
            operationType: PostCardOperationType.HideArticle,
            iconName: 'v-hidden'
        },
        {
            text: locale.unDeploy,
            type: 'click',
            operationType: PostCardOperationType.UnDeploy,
            iconName: 'v-no-deploy'
        },
        {
            text: locale.unTop,
            type: 'click',
            operationType: PostCardOperationType.UnTop,
            iconName: 'v-no-top'
        },
        {
            text: locale.unHide,
            type: 'click',
            operationType: PostCardOperationType.UnHide,
            iconName: 'v-show'
        },
        {
            text: locale.deleteArticle,
            type: 'click',
            operationType: PostCardOperationType.DeleteArticle,
            iconName: 'v-delete'
        },
        {
            text: locale.quitBatchOperation,
            type: 'click',
            operationType: PostCardOperationType.QuitBatchOption,
            iconName: 'v-editor-quit'
        }
    ]
}
// 获取主页窗口切换菜单
export let changeHomeWindowMenu = (locale: Side): ChangeHomeWindowMenu[] => {
    return [
        {
            text: locale.article,
            iconName: 'v-article',
            type: 'active',
            targetHomeWindow: WindowName.Article
        },
        {
            text: locale.page,
            iconName: 'v-page',
            type: 'active',
            targetHomeWindow: WindowName.Page
        },
        {
            text: locale.category,
            iconName: 'v-category',
            type: 'active',
            targetHomeWindow: WindowName.Category
        },
        {
            text: locale.settings,
            iconName: 'v-settings',
            type: 'active',
            targetHomeWindow: WindowName.Setting
        },
        {
            text: locale.recycleBin,
            iconName: 'v-delete',
            type: 'active',
            targetHomeWindow: WindowName.RecycleBin
        },
    ]
}
