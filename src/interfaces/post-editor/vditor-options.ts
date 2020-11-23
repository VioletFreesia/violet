export interface VditorOptions {
    after?: Function
    height?: string
    miniHeight?: string
    width?: string
    placeholder?: string
    lang?: string
    esc?: Function
    value?: string
    theme?: string
    outline?: string
    toolbar?: any
    counter?: {
        enable: boolean
        type: string
    }
    preview?: {
        maxWidth?: number
        hljs?: {
            enable: boolean
            style: string
            lineNumber: boolean
        }
        markdown?: {
            autoSpace: boolean
            fixTermTypo: boolean
            chinesePunct: boolean
            toc: boolean
            footnotes: boolean
        }
        theme?: {
            current: string
            list: object
        }
        math?: {
            engine: 'KaTeX' | 'MathJax'
        }
    }
    hint?: {
        emoji: object
    }
}