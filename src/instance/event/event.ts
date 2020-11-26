import {PostInfoEvent, PostContentEvent, Events} from "@/interfaces/event/event"

let postInfoEvent: PostInfoEvent = {
    Delete: {eventName: "PostInfoEventDelete"},
    Deploy: {eventName: "PostInfoEventDeploy"},
    Hide: {eventName: "PostInfoEventHide"},
    Modify: {eventName: "PostInfoEventModify"},
    Top: {eventName: "PostInfoEventTop"},
    UnDeploy: {eventName: "PostInfoEventUnDeploy"},
    UnHide: {eventName: "PostInfoEventUnHide"},
    UnTop: {eventName: "PostInfoEventUnTop"}
}

let postContentEvent: PostContentEvent = {
    Create: {eventName: "PostContentEventCreate"},
    Delete: {eventName: "PostContentEventDelete"},
    Get: {eventName: "PostContentEventGet"},
    Modify: {eventName: "PostContentEventModify"}
}

let events: Events = {
    postInfoEvent,
    postContentEvent
}

export default events