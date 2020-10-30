module.exports = {
    pluginOptions: {
        electronBuilder: {
            nodeIntegration: true,
            builderOptions: {
                appId: 'com.violetfreesia.violet',
                copyright: 'Copyright©violetfreesia',
                win: {
                    icon: 'public/logo.ico',
                    target: 'portable'
                }
            }
        }
    }
}
