'use strict'

import {app, protocol, BrowserWindow, ipcMain, session} from 'electron'
import {createProtocol} from 'vue-cli-plugin-electron-builder/lib'
import {VioletApp} from "@/server/violet-app"
import {LanguageList} from "@/instance/globalization/globalization";

const path = require('path')
const os = require('os')


const isDevelopment = process.env.NODE_ENV !== 'production'

// 保留窗口对象的全局引用，否则，当JavaScript对象被垃圾回收时，窗口将自动关闭。
let win: BrowserWindow | null

// 必须先注册方案，然后才能准备好应用程序
protocol.registerSchemesAsPrivileged([
    {scheme: 'app', privileges: {secure: true, standard: true}}
])

function createWindow() {
    // 创建窗口
    win = new BrowserWindow({
        width: 1200,
        height: 800,
        minHeight: 650,
        minWidth: 1200,
        frame: false,
        transparent: true,
        webPreferences: {
            webSecurity: false,
            nodeIntegration: true,
        }
    })

    if (process.env.WEBPACK_DEV_SERVER_URL) {
        // 如果处于开发模式，请加载开发服务器的URL
        win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string)
            .then(() => console.log('已加载页面'))
    } else {
        createProtocol('app')
        // 不在开发中时加载index.html
        win.loadURL('app://./index.html')
    }

    win.on('closed', () => {
        win = null
    })
    //窗口控制事件注册
    ipcMain.on('closeWindow', () => {
        if (win)
            win.close()
    })
    ipcMain.on('miniWindow', () => {
        if (win)
            win.minimize()
    })
    new VioletApp({workplace: 'D:\\Program\\violet\\workspace', language: LanguageList.zh_CN})
}

// app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors')

// 关闭所有窗口后退出。
app.on('window-all-closed', () => {
    // 在macOS上，应用程序及其菜单栏
    // 经常保持活动状态，直到用户使用Cmd + Q明确退出为止
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // 在macOS上，通常会在
    // 停靠图标被单击且没有其他窗口打开时在应用程序中重新创建一个窗口。
    if (win === null) {
        createWindow()
    }
})

// 当Electron完成初始化并准备创建浏览器窗口时，将调用此方法。
// 某些API仅在此事件发生后才能使用。
app.on('ready', async () => {
    createWindow()
})

app.whenReady().then(() => {
    // 安装Vue.js devtools
    if (isDevelopment && !process.env.IS_TEST) {
        let plugInPath = ''
        if (os.platform() === 'linux') {
            plugInPath = '.config/google-chrome/Default/Extensions/' +
                'ljjemllljcmogpfapbkkighbhhppjdbg/6.0.0.2_0'
        } else if (os.platform() === 'win32') {
            plugInPath = 'AppData/Local/Google/Chrome/' +
                'User Data/Default/Extensions/ljjemllljcmogpfapbkkighbhhppjdbg/6.0.0.2_0'
        }
        session.defaultSession.loadExtension(path.join(os.homedir(), plugInPath))
            .then(extension => console.log(`已安装${extension.name} 版本${extension.version}`))
            .catch(e => console.log('插件安装失败', e))
    }
    // 解决本地文件(图片,音频)无法加载
    protocol.registerFileProtocol('file', (request, callback) => {
        const pathname = request.url.substr(7)
        callback(pathname)
    });
})


// 在开发模式下，应父进程的要求完全退出。
if (isDevelopment) {
    if (process.platform === 'win32') {
        process.on('message', (data) => {
            if (data === 'graceful-exit') {
                app.quit()
            }
        })
    } else {
        process.on('SIGTERM', () => {
            app.quit()
        })
    }
}
