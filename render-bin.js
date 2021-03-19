var express = require('express');
var {startServer, router} = require('./render');

var app = express();
app.use(router);
startServer(app);
