const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
module.exports = {
    outputDir : "dist", // build 输出目录

    assetsDir : "assets", // 存放静态文件的目录

    /**
     * 是否在保存的时候使用 eslint-loader 进行检查
     * 有效值为 ： true | false | error
     * 当设置为 error 时， 检查出的错误会触发编译错误
     */
    lintOnSave : true , // 是否开启eslint, eslint自动校验

    // css相关的配置
    css : {

        // 是否使用css分离插件 ExtractTextPlugin
        extract: true,

        // 开启 CSS source maps ?
        //  SourceMap 帮助我们在控制台中转换成源码，从而进行 debug 。
        sourceMap : false , 

        // css预设器配置项
        loaderOptions: {
            postcss: {
              plugins: [
                autoprefixer({
                  overrideBrowserslist: ['Android >= 4.0', 'iOS >= 7']
                }),
                pxtorem({
                  rootValue: 75,              // 设计稿 640，750，1125 分成100份 1a = 7.5px，1rem = 75px
                  propList: ['*'],  // !不匹配属性（这里是字体相关属性不转换）['*', '!font*']
                  unitPrecision: 3,           // 最小精度，小数点位数
                  minPixelValue: 2,           // 替换的最小像素值
                  selectorBlackList: ['van']  // 过滤掉以van开头的样式
                })
              ]
            }
          }
        },

        devServer: {
            open: true, //是否自动弹出浏览器页面
            host: "0.0.0.0",
            port: '8080',
            https: false,   //是否使用https协议
            hotOnly: true, //是否开启热更新
            proxy: {
              '/api': {
                target: 'http://www.dalidali.vip/', //API服务器的地址
                // target : 'http://192.168.0.107:8989',
                ws: true,  //代理websockets
                changeOrigin: true, // 虚拟的站点需要更管origin
                pathRewrite: {   //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
                  '^/api': ''
                }
              }
            },
            before: app => { }
          },
          // 第三方插件配置
          pluginOptions: {
            // ...
          }

}