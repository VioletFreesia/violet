import windowEventHandler from "@/server/event/event-handler/window-event-handler";
import {BrowserWindow} from "electron";

/**
 * 所有事件处理函数汇总执行
 * @param win 窗口对象
 */
const listen = (win: BrowserWindow) => {
    windowEventHandler(win)
}

export default listen
