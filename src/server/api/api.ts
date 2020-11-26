import {PostInfo} from "@/interfaces/public/post"
import Event from "@/interfaces/event/event"
import events from "@/instance/event/event"
import {ipcRenderer} from 'electron'

let request = (event: Event, data: object | null = null) => {
    return new Promise(resolve => {
        resolve(ipcRenderer.sendSync(event.eventName, data))
    })
}
let imagePath = process.env.VUE_APP_POST_IMAGE_PATH

let getAllPostInfo = (): PostInfo[] => {
    return [
        {
            id: 'post1',
            title: '重学Java之IO',
            img: imagePath + "/violet/workspace/images/default1.jpg",
            tags: [],
            category: 'Java',
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
            img: imagePath + "/violet/workspace/images/default2.jpg",
            tags: [],
            category: 'Java',
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
            img: imagePath + "/violet/workspace/images/default3.jpg",
            tags: [],
            category: 'Java',
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
            img: imagePath + "/violet/workspace/images/default1.jpg",
            tags: [],
            category: 'Java',
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
            img: imagePath + "/violet/workspace/images/default2.jpg",
            tags: [],
            category: 'Java',
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
            img: imagePath + "/violet/workspace/images/default3.jpg",
            tags: [],
            category: 'Java',
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
            img: imagePath + "/violet/workspace/images/default1.jpg",
            tags: [],
            category: 'Java',
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
            img: imagePath + "/violet/workspace/images/default2.jpg",
            tags: [],
            category: 'Java',
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
            img: imagePath + "/violet/workspace/images/default3.jpg",
            tags: [],
            category: 'Java',
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
            img: imagePath + "/violet/workspace/images/default1.jpg",
            tags: [],
            category: 'Java',
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
            img: imagePath + "/violet/workspace/images/default2.jpg",
            tags: [],
            category: 'Java',
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
            img: imagePath + "/violet/workspace/images/default3.jpg",
            tags: [],
            category: 'Java',
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
            img: imagePath + "/violet/workspace/images/default1.jpg",
            tags: [],
            category: 'Java',
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
            img: imagePath + "/violet/workspace/images/default2.jpg",
            tags: [],
            category: 'Java',
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
            img: imagePath + "/violet/workspace/images/default3.jpg",
            tags: [],
            category: 'Java',
            modifyDate: '2020-11-01',
            isDeploy: true,
            isTop: false,
            isHide: false,
            fileName: '',
            isSelected: false
        }
    ]
}

let getSystemConfig = () => {
    return ipcRenderer.sendSync(events.settingEvent.GetSystemConfig.eventName)
}


// 主进程与渲染进程通信api的具体实现
const api = {
    postApi: {
        getAllPostInfo,
    },
    settingApi: {
        getSystemConfig,
    }
}
export default api
