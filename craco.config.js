const aliyunTheme = require('@ant-design/aliyun-theme');
const CracoLessPlugin = require('craco-less');
const { ModuleFederationPlugin } = require("webpack").container;
const { ProvidePlugin } = require("webpack");
const allDeps = require("./package.json").dependencies;

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
        {
            plugin: {
                overrideWebpackConfig: ({ webpackConfig }) => {
                    webpackConfig.resolve.fallback = {
                        ...(webpackConfig.resolve.fallback || {}),
                        'buffer': false,
                        'stream': false,
                        // 'url': false,
                        'util': false,
                        // 'assert': false,
                        // 'constants': false,
                        'crypto': false,
                        // 'domain': false,
                        // 'events': false,
                        // 'http': false,
                        // 'https': false,
                        // 'os': false,
                        // 'path': false,
                        // 'punycode': false,
                        // 'querystring': false,

                    }
                    return webpackConfig;
                }
            }
        }
    ],
    // webpack: {
    //     configure: (webpackConfig, { env, paths }) => {
    //         webpackConfig.resolve = {
    //             fallback: {
    //                 ...(webpackConfig.resolve.fallback || {}),
    //                 'buffer': false,
    //                 // 'stream': false,
    //                 // 'url': false,
    //                 // 'util': false,
    //                 // 'assert': false,
    //                 // 'constants': false,
    //                 'crypto': false,
    //                 // 'domain': false,
    //                 // 'events': false,
    //                 // 'http': false,
    //                 // 'https': false,
    //                 // 'os': false,
    //                 // 'path': false,
    //                 // 'punycode': false,
    //                 // 'querystring': false,
    //             }
    //         }
    //         return webpackConfig;
    //     }
    // }
};