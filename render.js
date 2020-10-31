#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var React = require('react');
var ReactDOMServer = require('react-dom/server');

var argv = require('yargs')
  .usage('Usage: $0 [--port NUM] [--host ADDRESS]')
  .describe('port', 'The port to listen to')
  .describe('host', 'The host address to bind to')
  .describe('debug', 'Print stack traces on error').alias('debug', 'd')
  .describe('watch', 'Watch the source for changes and reload')
  .describe('whitelist', 'Whitelist a root directory where the javascript files can be')
  .default('whitelist', process.env.REACT_WHITELIST)
  .help('h').alias('h', 'help')
  .argv;

morgan.token('file', function(req, res){ return path.basename(req.body.path_to_source); });

var router = express.Router();
router.use(bodyParser.json({limit: '50mb'}));
router.use(morgan('[:date[iso]] :method :url :status :response-time ms - :file :res[content-length]'));

// Component cache living in global scope
var cache = {};

var Component = function Component(pathToSource) {
  this.pathToSource = pathToSource;
  this.component = require(this.pathToSource);

  // Detect bad JS file
  if (!this.component) {
    throw new Error('JS file did not export anything: ' + this.pathToSource);
  }
  if (typeof this.component.default !== 'undefined') {
    // ES6 'export default' support
    this.component = this.component.default;
  }
  if (typeof this.component.render !== 'function' &&
      ( typeof this.component.prototype === 'undefined' ||
        typeof this.component.prototype.render !== 'function')
    ) {
    throw new Error(this.component.name + ' is not a valid React component because it has no render method: ' + this.pathToSource);
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

router.post('/render', function service(request, response, next) {
  var toStaticMarkup = request.body.to_static_markup || false;
  var pathToSource = request.body.path_to_source;
  var props = request.body.props || {};

  if (!pathToSource) {
    return response.status(400).send('path_to_source required');
  }
  pathToSource = path.normalize(pathToSource);
  if (argv.whitelist) {
    if (!pathToSource.startsWith(argv.whitelist)) {
      return response.status(400).send('invalid path_to_source');
    }
  }

  if (!(pathToSource in cache)) {
    console.log('[%s] Loading new component %s', new Date().toISOString(), pathToSource);
    cache[pathToSource] = new Component(pathToSource);
  }
  var component = cache[pathToSource];

  component.render(props, toStaticMarkup, function(output) {
    response.send(output);
    next();
  });
});

function errorHandler(err, request, response, next) {
  console.log('[' + new Date().toISOString() + '] ' + err.stack);
  response.status(500).send(argv.debug ? err.stack : err.toString());
  next();
}
router.use(errorHandler);

function startServer(app) {
  app.listen(argv.port || 63578, argv.host || 'localhost', function() {
    console.log('Started server at http://%s:%s', server.address().address, server.address().port);
});
}

module.exports = {router, startServer};
