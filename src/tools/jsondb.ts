const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

/**
 * 对操作json文件的简单封装
 */
export default class JsonDB {
    private readonly _db: any //数据库
    private _autoCommit: boolean //是否自动提交

    get db(): any {
        return this._db;
    }

    get autoCommit(): boolean {
        return this._autoCommit;
    }

    set autoCommit(value: boolean) {
        this._autoCommit = value;
    }

    /**
     * json数据库构造函数
     * @param filename json文件位置
     * @param data 初始化数据库的默认数据
     * @param autoCommit 修改后是否自动提交
     */
    constructor(filename: string, data: null | object, autoCommit = false) {
        const adapter = new FileSync(filename)
        this._db = low(adapter)
        this._autoCommit = autoCommit
        if (data)
            this._db.defaults(data).write()
    }

    /**
     * 判断是否含有某个属性
     * @param propertyName 属性名
     */
    hasProperty(propertyName: string) {
        return this._db.has(propertyName).value()
    }

    /**
     * 设置某个属性的值
     * @param propertyName 属性名
     * @param value 属性值
     */
    set(propertyName: string, value: any) {
        this._db.set(propertyName, value).value()
        if (this._autoCommit) {
            return this.commit()
        }
        return this
    }

    /**
     * 获取某个属性的值
     * @param propertyName 属性名
     * @param condition 赛选条件 如{id:1},表示只保留id为1de
     */
    getValue(propertyName: string, condition: null | object) {
        if (condition) {
            return this._db.get(propertyName).filter(condition).value()
        }
        return this._db.get(propertyName).value()
    }

    /**
     * 删除某个属性
     * @param propertyName
     */
    unset(propertyName: string) {
        this._db.unset(propertyName).value()
        if (this._autoCommit) {
            return this.commit()
        }
        return this
    }

    /**
     * 移除值类型为数组中的某个元素
     * @param arrayPropertyName 数组属性名
     * @param condition 移除条件 如{id: '1'},表示移除数组中id为1的
     */
    remove(arrayPropertyName: string, condition: object) {
        this._db.get(arrayPropertyName).remove(condition).value()
        if (this._autoCommit) {
            return this.commit()
        }
        return this
    }

    /**
     * 深克隆某个属性
     * @param propertyName 属性名
     */
    deepClone(propertyName: string) {
        return this._db.get(propertyName)
            .cloneDeep().value()
    }

    /**
     * 手动提交所有更改
     */
    commit() {
        return this._db.write()
    }
}