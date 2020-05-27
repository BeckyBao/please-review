const autoprefixer = require("autoprefixer");
const pxtorem = require("postcss-pxtorem");

module.exports = {
    // outputDir: "docs",
    publicPath: "./",
    outputDir: process.env.outputDir,// 输出文件目录
    assetsDir: 'static',// 放置生成的静态资源 (js、css、img、fonts) 的目录
    lintOnSave: false,
    productionSourceMap: true,
    devServer: {
        port:8080,
        overlay: {
            warnings: false,
            errors: true
        },
        // proxy: {
        //     '/mock-api': {
        //         target: 'http://localhost:8080',
        //         changeOrigin: true,
        //         pathRewrite: {
        //             '^/mock-api': '/mock'
        //         }
        //     }
        // }
    },
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    autoprefixer(),
                    pxtorem({
                        rootValue: 37.5,
                        propList: ["*"]
                    })
                ]
            }
        }
    }
};