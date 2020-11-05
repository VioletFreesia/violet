import {Api} from "@/interfaces/api/api"
import {PostInfo} from "@/interfaces/public/post"
import {SystemConfig} from "@/interfaces/public/setting"
import {LanguageList} from "@/static/globalization/globalization"

let getAllPostInfo = (): PostInfo[] => {
    return [
        {
            id: 'post1',
            title: '重学Java之IO',
            img: "D:/Program/violet/src/assets/images/default1.jpg",
            tags: [],
            category: {name: 'Java'},
            modifyDate: '2020-11-01',
            isDeploy: true,
            isTop: false,
            isHide: true,
            fileName: '',
            isSelected: false
        },
        {
            id: 'post2',
            title: '重学Java之异常',
            img: "D:/Program/violet/src/assets/images/default2.jpg",
            tags: [],
            category: {name: 'Java'},
            modifyDate: '2020-11-01',
            isDeploy: false,
            isTop: true,
            isHide: false,
            fileName: '',
            isSelected: false
        },
        {
            id: 'post3',
            title: '重学Java之泛型',
            img: "D:/Program/violet/src/assets/images/default3.jpg",
            tags: [],
            category: {name: 'Java'},
            modifyDate: '2020-11-01',
            isDeploy: true,
            isTop: false,
            isHide: false,
            fileName: '',
            isSelected: false
        },
        {
            id: 'post4',
            title: '重学Java之IO',
            img: "D:/Program/violet/src/assets/images/default1.jpg",
            tags: [],
            category: {name: 'Java'},
            modifyDate: '2020-11-01',
            isDeploy: true,
            isTop: false,
            isHide: true,
            fileName: '',
            isSelected: false
        },
        {
            id: 'post5',
            title: '重学Java之异常',
            img: "D:/Program/violet/src/assets/images/default2.jpg",
            tags: [],
            category: {name: 'Java'},
            modifyDate: '2020-11-01',
            isDeploy: false,
            isTop: true,
            isHide: false,
            fileName: '',
            isSelected: false
        },
        {
            id: 'post6',
            title: '重学Java之泛型',
            img: "D:/Program/violet/src/assets/images/default3.jpg",
            tags: [],
            category: {name: 'Java'},
            modifyDate: '2020-11-01',
            isDeploy: true,
            isTop: false,
            isHide: false,
            fileName: '',
            isSelected: false
        },
        {
            id: 'post7',
            title: '重学Java之IO',
            img: "D:/Program/violet/src/assets/images/default1.jpg",
            tags: [],
            category: {name: 'Java'},
            modifyDate: '2020-11-01',
            isDeploy: true,
            isTop: false,
            isHide: true,
            fileName: '',
            isSelected: false
        },
        {
            id: 'post8',
            title: '重学Java之异常',
            img: "D:/Program/violet/src/assets/images/default2.jpg",
            tags: [],
            category: {name: 'Java'},
            modifyDate: '2020-11-01',
            isDeploy: false,
            isTop: true,
            isHide: false,
            fileName: '',
            isSelected: false
        },
        {
            id: 'post9',
            title: '重学Java之泛型',
            img: "D:/Program/violet/src/assets/images/default3.jpg",
            tags: [],
            category: {name: 'Java'},
            modifyDate: '2020-11-01',
            isDeploy: true,
            isTop: false,
            isHide: false,
            fileName: '',
            isSelected: false
        },
        {
            id: 'post10',
            title: '重学Java之IO',
            img: "D:/Program/violet/src/assets/images/default1.jpg",
            tags: [],
            category: {name: 'Java'},
            modifyDate: '2020-11-01',
            isDeploy: true,
            isTop: false,
            isHide: true,
            fileName: '',
            isSelected: false
        },
        {
            id: 'post11',
            title: '重学Java之异常',
            img: "D:/Program/violet/src/assets/images/default2.jpg",
            tags: [],
            category: {name: 'Java'},
            modifyDate: '2020-11-01',
            isDeploy: false,
            isTop: true,
            isHide: false,
            fileName: '',
            isSelected: false
        },
        {
            id: 'post12',
            title: '重学Java之泛型',
            img: "D:/Program/violet/src/assets/images/default3.jpg",
            tags: [],
            category: {name: 'Java'},
            modifyDate: '2020-11-01',
            isDeploy: true,
            isTop: false,
            isHide: false,
            fileName: '',
            isSelected: false
        },
        {
            id: 'post13',
            title: '重学Java之IO',
            img: "D:/Program/violet/src/assets/images/default1.jpg",
            tags: [],
            category: {name: 'Java'},
            modifyDate: '2020-11-01',
            isDeploy: true,
            isTop: false,
            isHide: true,
            fileName: '',
            isSelected: false
        },
        {
            id: 'post14',
            title: '重学Java之异常',
            img: "D:/Program/violet/src/assets/images/default2.jpg",
            tags: [],
            category: {name: 'Java'},
            modifyDate: '2020-11-01',
            isDeploy: false,
            isTop: true,
            isHide: false,
            fileName: '',
            isSelected: false
        },
        {
            id: 'post15',
            title: '重学Java之泛型',
            img: "D:/Program/violet/src/assets/images/default3.jpg",
            tags: [],
            category: {name: 'Java'},
            modifyDate: '2020-11-01',
            isDeploy: true,
            isTop: false,
            isHide: false,
            fileName: '',
            isSelected: false
        }
    ]
}

let getSystemConfig = (): SystemConfig => {
    return {appDir: '', language: LanguageList.zh_CN}
}

// 主进程与渲染进程通信api的具体实现
const api: Api = {
    postApi: {
        getAllPostInfo,
        getAllPost: () => {
        },
        patchPost: () => {
        },
        deletePost: () => {
        },
        putPost: () => {
        }
    },
    settingApi: {
        getAllSetting: () => {
        },
        getSiteConfig: () => {
        },
        getThemeConfig: () => {
        },
        getRemoteConfig: () => {
        },
        getCommentConfig: () => {
        },
        getSystemConfig,
        patchSiteConfig: () => {
        },
        patchThemeConfig: () => {
        },
        patchRemoteConfig: () => {
        },
        patchCommentConfig: () => {
        },
        patchSystemConfig: () => {
        },
    }
}
export default api
