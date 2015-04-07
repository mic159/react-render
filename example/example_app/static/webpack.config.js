var path = require('path');

var context = __dirname;
// The directory that generated bundles will be placed in
var outputDir = path.join(__dirname, 'js');
var moduleOpts = {
  // Inform webpack to not parse the jQuery library, this is an
  // an optimisation which helps to reduce the build time associated
  // with large libraries
  noParse: [
    /jquery/
  ],
  // Inform webpack to use the babel loader when reading files
  // ending in '.jsx'
  loaders: [
    {test: /\.jsx$/, exclude: /node_modules/, loader: 'babel-loader'}
  ]
};

module.exports = [
  // -----------------
  //   Client side
  // -----------------
  {
    context: context,
    entry: {
      'main': ['./jsx/main.jsx']
    },
    output: {
      path: outputDir,
      filename: '[name].js',
      // A global variable that the bundle will be exposed as
      library: 'main'
    },
    module: moduleOpts,
    devtool: 'eval'
  },
  // -----------------
  //    Server side
  // -----------------
  {
    context: context,
    entry: {
      'main': ['./jsx/components/CommentBox.jsx']
    },
    output: {
      path: outputDir,
      filename: '[name].server.js',
      libraryTarget: 'commonjs2'
    },
    module: moduleOpts
  }];