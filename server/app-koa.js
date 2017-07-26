// const express = require('express');
const Koa = require('koa')
const morgan = require('koa-morgan')
const path = require('path');
const static = require('koa-static')
const fs = require('fs')

const app = new Koa();

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
app.use(static(path.resolve(__dirname, '..', 'build')));

// Always return the main index.html, so react-router render the route in the client
app.use(async (ctx,next) =>{
	//stream
	ctx.type = 'html';
	ctx.body = await fs.createReadStream(path.resolve(__dirname, '..', 'build', 'index.html'));

	//express
	// res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
})

//express
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
// });

module.exports = app;
