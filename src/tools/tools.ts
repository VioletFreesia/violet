import fs from 'fs'

export let readJsonFile = (filename: string): any => {
    try {
        let str = fs.readFileSync(filename)
        return JSON.parse(str.toString())
    } catch (e) {
        console.log("文件读取失败", e)
    }
}