const aliyunTheme = require('@ant-design/aliyun-theme');
const CracoLessPlugin = require('craco-less');
const aeonx_theme_vars = require("./src/theme/aeonx-theme1/variables/aeonx-theme-vars");

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            // loader: 'less-loader',
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: aliyunTheme,
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};