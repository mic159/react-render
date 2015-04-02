var path = require('path');

module.exports = {
  // The root directory of the bundle
  context: __dirname,
  // The bundle's entry file
  entry: {
    'main': ['./jsx/components/CommentBox.jsx']
  },
  output: {
    // The directory that generated bundle will be placed in
    path: path.join(__dirname, 'js'),
    // The file name of the generated bundle
    filename: '[name].server.js',
    // A global variable that the bundle will be exposed as
    libraryTarget: 'commonjs2'
  },
  module: {
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
  },
  // A development tool that provides source maps
  devtool: 'eval'
};