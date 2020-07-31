# app1

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## *********************** 创建项目 ***************************

1. 创建项目 vue create app
2. 选择自行选择配置：Manually select features
3. 选择 Babel， Router， Vuex, Formatter, css
    - Babel : 将语法转换为 Es5
    - Router : 路由选择
    - Vuex : 组件数据交互
    - Formatter : 格式化代码
    - css : 可以选择需要用到的预处理语法。
4. Use history mode for router? (Requires proper server setup for index fallback in production) (Y/n) Y
5. 然后回车就好。


## *********************** vue.config.js ***************************

```js
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
```


## *********************** 请求时候的请求路由 配置环境变量 ***************************

1. 创建环境变量
    - .env.development 文件名 测试环境-会转接到代理
        - VUE_APP_BASE_API = '/api' 
        - 内容 `proxy`代理中设置了  `/api`, 请求的时候会默认请求到代理地址
    
    - .env.production 文件名 生产环境 build后请求的地址
        - VUE_APP_BASE_API = 'http://www.dalidali.vip'
        - 请求的时候会默认请求到这个地址

2. 使用环境变量 
    - process.env.VUE_APP_BASE_API