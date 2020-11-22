import {PostCardOperationType, WindowName} from "@/static/enum/enums"

export interface SideMenu {
    text: string            //菜单的文本
    iconName: string        //图标名字
    type: 'active' | 'click'//菜单的类型,active当点击后处于激活状态,click只会显示点击动画不会显示激活状态
}

export interface ChangeHomeWindowMenu extends SideMenu {
    targetHomeWindow: WindowName
}

export interface BatchOperationMenu extends SideMenu {
    operationType: PostCardOperationType
}
