/*
 * @Author: Nafis Ayaz
 * @Date: 09-12-2019 20:35:20 
 * @Last Modified by: sir.ayaz47@gmail.com
 * @Last Modified time: 09-12-2019 20:35:20
 */

require('rootpath')();
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const os  = require('os');
const fs = require('fs');
const util = require('util');
const app = express();
const cors = require('cors');
//const initialize = require("initialization/initialize")();

// view engine setup
app.use( bodyParser.json({limit: '50mb'}) );
app.use(bodyParser.urlencoded({
 limit: '50mb',
 extended: true,
 parameterLimit: 50000
}));
app.enable('trust proxy');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'ui')));
app.use(express.static(path.join(__dirname, 'public')));


app.use(function(req, res, next) {
 var oneof = false;
 if(req.headers.origin) {
	 res.header('Access-Control-Allow-Origin', req.headers.origin);
	 oneof = true;
 }
 if(req.headers['access-control-request-method']) {
	 res.header('Access-Control-Allow-Methods', req.headers['access-control-request-method']);
	 oneof = true;
 }
 if(req.headers['access-control-request-headers']) {
	 res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
	 oneof = true;
 }
 if(oneof) {
	 res.header('Access-Control-Max-Age', 60 * 60 * 24 * 365);
 }

 // intercept OPTIONS method
 if (oneof && req.method == 'OPTIONS') {
	 res.sendStatus(200);
 }
 else {
	 next();
 }
});


/**
 * @ROUTING
 */
const adminRoutes  = require('routes/v1/route');
app.use('/api/v1',adminRoutes);

/**
* END ROUTING
*/


global.hostname = os.hostname();
console.log(global.hostname);
app.listen('8000')
module.exports = app;
