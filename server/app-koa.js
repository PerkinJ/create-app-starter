const Koa = require('koa')
const morgan = require('koa-morgan')
const path = require('path');
const static = require('koa-static')
const fs = require('fs')

const app = new Koa();

// logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// static assets
app.use(static(path.resolve(__dirname, '..', 'build')));

//异步读取文件的形式
app.use(async (ctx,next) =>{
	ctx.type = 'html';
	ctx.body = await fs.createReadStream(path.resolve(__dirname, '..', 'build', 'index.html'));

})


module.exports = app;