const aliyunTheme = require('@ant-design/aliyun-theme');
const CracoLessPlugin = require('craco-less');
const { ModuleFederationPlugin } = require("webpack").container;
const { ProvidePlugin } = require("webpack");
const allDeps = require("./package.json").dependencies;
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
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
            plugin: new NodePolyfillPlugin({
                excludeAliases: [
                    "assert",
                    "console",
                    "constants",
                    "crypto",
                    "domain",
                    "events",
                    "http",
                    "https",
                    "os",
                    "path",
                    "punycode",
                    "querystring",
                    "_stream_duplex",
                    "_stream_passthrough",
                    "_stream_transform",
                    "_stream_writable",
                    "string_decoder",
                    "sys",
                    "timers",
                    "tty",
                    "url",
                    "util",
                    "vm",
                    "zlib"
                ]
            }),
        },
        {
            // plugin: new ProvidePlugin(process.env.NODE_ENV !== 'production' ? {
            //     process: 'process/browser'
            // } : {}),
            plugin: new ProvidePlugin( {
                process: 'process/browser'
            }),

        },
        {
            plugin: process.NODE_ENV === 'production' ? {} :
                {
                    overrideWebpackConfig: ({ webpackConfig }) => {
                        // if (process.env.NODE_ENV === 'production') {
                        webpackConfig.resolve.fallback = {
                            // ...(webpackConfig.resolve.fallback || {}),
                            stream: require.resolve('stream-browserify'),
                            util: require.resolve('util/'),
                            // zlib: require.resolve('browserify-zlib'),
                            // assert: require.resolve('assert/'),
                            crypto: require.resolve('crypto-browserify'),
                            // fs: require.resolve('browserify-fs'),
                            path: require.resolve('path-browserify'),

                            buffer: require.resolve("buffer/"),
                            // 'stream': require.resolve("stream-browserify"),
                            // 'url': false,
                            // 'util': require.resolve("util/"),
                            // 'assert': false,
                            // 'constants': false,
                            // 'crypto': require.resolve("crypto-browserify"),
                            // 'domain': false,
                            // 'events': false,
                            // 'http': false,
                            // 'https': false,
                            // 'os': false,
                            // 'path': false,
                            // 'punycode': false,
                            // 'querystring': false,
                            process: require.resolve("process/browser"),

                        }
                        return webpackConfig;
                        // }
                        // return webpackConfig;    
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