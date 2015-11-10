#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var React = require('react');
var ReactDOMServer = require('react-dom/server');

var argv = require('yargs')
  .usage('Usage: $0 [--port NUM]')
  .describe('port', 'The port to listen to')
  .describe('debug', 'Print stack traces on error').alias('debug', 'd')
  .describe('watch', 'Watch the source for changes and reload')
  .help('h').alias('h', 'help')
  .argv;

morgan.token('file', function(req, res){ return path.basename(req.body.path_to_source); });

var app = express();
app.use(bodyParser.json());
app.use(morgan('[:date[iso]] :method :url :status :response-time ms - :file :res[content-length]'));

// Component cache living in global scope
var cache = {};

var Component = function Component(pathToSource) {
  this.pathToSource = pathToSource;
  this.component = require(this.pathToSource);

  // Detect bad JS file
  if (!this.component || !(
      typeof this.component.render === 'function' ||
      typeof this.component.prototype.render === 'function'
    )) {
    throw new Error('Not a React component: ' + this.pathToSource);
  }

  this.factory = React.createFactory(this.component);

  if (argv.watch) {
    var watcher = fs.watch(this.pathToSource, function reloader(event, filename) {
      console.log('[%s] Reloading %s', new Date().toISOString(), pathToSource);
      delete require.cache[pathToSource];
      delete cache[pathToSource];
      watcher.close();
    });
  }
};

Component.prototype.render = function render(props, toStaticMarkup, callback) {
  var element = this.factory(props);
  if (toStaticMarkup) {
    callback(ReactDOMServer.renderToStaticMarkup(element));
  } else {
    callback(ReactDOMServer.renderToString(element));
  }
};

app.post('/render', function service(request, response) {
  var toStaticMarkup = request.body.to_static_markup || false;
  var pathToSource = request.body.path_to_source;
  var props = request.body.props || {};

  if (!pathToSource) {
    return response.status(400).send('path_to_source required');
  }

  if (!(pathToSource in cache)) {
    console.log('[%s] Loading new component %s', new Date().toISOString(), pathToSource);
    cache[pathToSource] = new Component(pathToSource);
  }
  var component = cache[pathToSource];

  component.render(props, toStaticMarkup, function(output) {
    response.send(output);
  });
});

app.use(function errorHandler(err, request, response, next) {
  console.log('[' + new Date().toISOString() + '] ' + err.stack);
  response.status(500).send(argv.debug ? err.stack : "An error occurred during rendering");
});

var server = app.listen(argv.port || 63578, 'localhost', function() {
  console.log('Started server at http://%s:%s', server.address().address, server.address().port);
});

module.exports = app;
