import {IPost} from '@/interfaces/post'
import {ITag} from '@/interfaces/tag'
import {ITheme} from '@/interfaces/theme'
import {IMenu} from '@/interfaces/menu'
import {ISetting, ICommentSetting} from '@/interfaces/setting'
import {
    DEFAULT_POST_PAGE_SIZE,
    DEFAULT_ARCHIVES_PAGE_SIZE,
    DEFAULT_FEED_COUNT,
    DEFAULT_ARCHIVES_PATH,
    DEFAULT_POST_PATH,
    DEFAULT_TAG_PATH,
} from '@/helpers/constants'


export interface Site {
    appDir: string
    config: any
    posts: IPost[]
    tags: ITag[]
    menus: IMenu[]
    themeConfig: ITheme
    themeCustomConfig: any
    currentThemeConfig: any
    themes: string[]
    setting: ISetting
    commentSetting: ICommentSetting
    lang: string
    updateSite: Function
    updatePosts: Function
    setLanguage: Function

}


const siteState: Site = {
    appDir: '',
    config: {},
    posts: [],
    tags: [],
    menus: [],
    themeConfig: {
        themeName: '',
        postPageSize: DEFAULT_POST_PAGE_SIZE,
        archivesPageSize: DEFAULT_ARCHIVES_PAGE_SIZE,
        siteName: '',
        siteDescription: '',
        footerInfo: 'Powered by Violet',
        showFeatureImage: true,
        postUrlFormat: 'SLUG',
        tagUrlFormat: 'SLUG',
        dateFormat: 'YYYY-MM-DD',
        feedCount: DEFAULT_FEED_COUNT,
        feedFullText: true,
        archivesPath: DEFAULT_ARCHIVES_PATH,
        postPath: DEFAULT_POST_PATH,
        tagPath: DEFAULT_TAG_PATH,
    },
    themeCustomConfig: {},
    currentThemeConfig: {},
    themes: [],
    setting: {
        platform: 'github',
        domain: '',
        repository: '',
        branch: '',
        username: '',
        email: '',
        tokenUsername: '',
        token: '',
        cname: '',
        port: '22',
        server: '',
        password: '',
        privateKey: '',
        remotePath: '',
    },
    commentSetting: {
        showComment: false,
        commentPlatform: 'gitalk',
        gitalkSetting: {
            clientId: '',
            clientSecret: '',
            repository: '',
            owner: '',
        },
        disqusSetting: {
            api: '',
            apikey: '',
            shortname: '',
        },
    },
    lang: 'zh-CN',
    updateSite(siteData: Site) {
        this.appDir = siteData.appDir
        this.config = siteData.config
        this.posts = siteData.posts
        this.tags = siteData.tags
        this.menus = siteData.menus
        this.themeConfig = siteData.themeConfig
        this.themeCustomConfig = siteData.themeCustomConfig
        this.currentThemeConfig = siteData.currentThemeConfig
        this.themes = siteData.themes
        this.setting = siteData.setting
        this.commentSetting = siteData.commentSetting
        this.lang = siteData.lang
    },
    updatePosts(posts: IPost[]) {
        this.posts = posts
    },
    setLanguage(lang: string) {
        this.lang = lang
    }
}


export default siteState
