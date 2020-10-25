const {ipcRenderer} = window.require('electron')
/**
 * 渲染进程向主进程发送请求的函数
 * @param event 请求事件名
 * @param data 请求参数
 */
const request = (event: string, data: Array<any> | null) => {
    ipcRenderer.send(event, data)
}
export default request
