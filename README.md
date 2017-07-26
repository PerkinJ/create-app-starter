此脚手架是基于create-react-app搭建了基于react+redux的脚手架，加上了基于koa2(也有express版本)实现的静态服务器，并且配置了pm2的自动化部署。本人针对pm2一键部署以及koa2静态服务器的搭建也写了相关文章[创建koa2静态服务器并实现pm2一键部署到服务器](http://www.perkinzone.cn)
项目目录如下：
```bash
create-app-starter
├── README.md
├── node_modules
├── package.json
├── ecosystem.json  //pm2配置文件
├── .gitignore
├── public
│   └── favicon.ico
│   └── index.html
│   └── manifest.json
├── server #静态服务器
└── src
    └── components #表现层组件
        └── Loading
           ├── index.js
           └── index.scss
        └── Dialog
    └── containers #最外层的容器层，主要是provider包裹，传递store树
    └── layout  #主要是整个容器样式进行初始化，在这可以添加nav,header,footer等无状态组件
    └── routes   #路由层，主要通过路由来划分不同的组件
        └── index.js  #路由的设置，推荐使用react-router
        └── Home
            ├── components # 容器型组件
            ├── containers # 主要是使用connect 连接组件
            ├── modules #定义action，并且执行reducers
            └── index.js #结合webpack，根据路由做按需加载的操作 
    └── store
        ├── createStore.js  #创建store,添加一些middlewares
        ├── location.js
        └── reducers.js  #封装reducer，结合combineReducer  
    ├── styles 
    ├── registerServiceWorker.js  #create-react-app自带的servicework
    └── index.js #入口文件
```
项目安装依赖
```
npm install
```
项目启动
```
npm start
```
项目打包
```
npm run build
```
静态服务器启动
```
npm run start:prod
```
pm2一键部署,此处需要做具体的配置，具体查看ecosystem.json文件，本人也写了对pm2配置相关的文章，可以加深大家的理解。[创建koa2静态服务器并实现pm2一键部署到服务器](http://www.perkinzone.cn)
```
npm run deploy
```
测试
```
npm run test
```