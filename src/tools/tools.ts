import fs from 'fs'

export let readJsonFile = (filename: string): any => {
    try {
        let str = fs.readFileSync(filename)
        return JSON.parse(str.toString())
    } catch (e) {
        console.log("文件读取失败", e)
    }
}
/**
 * 生成编辑器界面的工具栏
 * @param option
 */
export let getToolBarConfig = (option: {
    quitText: string
    quitCallback: (status?: boolean | undefined) => void
    saveText: string
    saveCallback: (status?: boolean | undefined) => void
    insertImageText: string
    insertImageCallback: (status?: boolean | undefined) => void
}) => {
    return [
        {
            hotkey: '',
            name: 'quit',
            tipPosition: 'nw',
            tip: option.quitText,
            className: 'violet-btn',
            click: option.quitCallback
        },
        {
            hotkey: 'ctrl-s',
            name: 'save',
            tipPosition: 'nw',
            tip: option.saveText,
            className: 'violet-btn',
            click: option.saveCallback
        },
        'undo',
        'redo',
        '|',
        'emoji',
        'headings',
        'bold',
        'italic',
        'strike',
        '|',
        'line',
        'quote',
        'check',
        'list',
        'ordered-list',
        'outdent',
        'indent',
        '|',
        'code',
        'inline-code',
        'link',
        'table',
        {
            hotkey: 'ctrl-p',
            name: 'image',
            tipPosition: 'nw',
            tip: option.insertImageText,
            className: 'violet-btn',
            click: option.insertImageCallback
        },
        '|',
        'outline',
        'code-theme',
        'export',
        'edit-mode'
    ]
}