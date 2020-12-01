import {Events} from "@/interfaces/event/event"


let events: Events = {
    postInfoEvent: {
        Delete: {eventName: "PostInfoEventDelete"},
        UnDelete: {eventName: "PostInfoEventUnDelete"},
        Deploy: {eventName: "PostInfoEventDeploy"},
        Hide: {eventName: "PostInfoEventHide"},
        Modify: {eventName: "PostInfoEventModify"},
        Top: {eventName: "PostInfoEventTop"},
        UnDeploy: {eventName: "PostInfoEventUnDeploy"},
        UnHide: {eventName: "PostInfoEventUnHide"},
        UnTop: {eventName: "PostInfoEventUnTop"},
        GetAll: {eventName: "PostInfoEventGetAll"}
    },
    postContentEvent: {
        Create: {eventName: "PostContentEventCreate"},
        Delete: {eventName: "PostContentEventDelete"},
        Get: {eventName: "PostContentEventGet"},
        Modify: {eventName: "PostContentEventModify"}
    },
    settingEvent: {
        GetSiteConfig: {eventName: "SettingEventGetSiteConfig"},
        GetSystemConfig: {eventName: "SettingEventGetSystemConfig"}
    }
}

export default events