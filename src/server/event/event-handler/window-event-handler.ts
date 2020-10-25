import {BrowserWindow, ipcMain} from "electron";
import events from "@/server/event/events";

/**
 * 窗口事件处理函数
 * @param win 窗口对象
 */
const windowEventHandler = (win: BrowserWindow) => {
    ipcMain.on(events.windowEvent.closeWindow, () => {
        win.close()
    })
    ipcMain.on(events.windowEvent.miniWindow, () => {
        win.minimize()
    })
}
export default windowEventHandler
