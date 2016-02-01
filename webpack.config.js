var path = require('path')
var webpack = require('webpack') 
module.exports = {
  //devtool: 'cheap-module-eval-source-map',
  entry: {
    common:['script!./primus.js','babel-polyfill','react','react-dom','react-redux','redux','lodash','redux-saga'],
    app:'./app.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/bundle/'
  },
  plugins: [
   // new webpack.optimize.OccurenceOrderPlugin(),
    //new webpack.HotModuleReplacementPlugin(),
    //new webpack.NoErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin('common', 'common.bundle.js')
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: [ 'babel'],
      exclude: /node_modules/,
      include: __dirname
      
    }
   ]
  }
}

/*
// When inside Redux repo, prefer src to compiled version.
// You can safely delete these lines in your project.
var reduxSrc = path.join(__dirname, '..', '..', 'src')
var reduxNodeModules = path.join(__dirname, '..', '..', 'node_modules')
var fs = require('fs')
if (fs.existsSync(reduxSrc) && fs.existsSync(reduxNodeModules)) {
  // Resolve Redux to source
  module.exports.resolve = { alias: { 'redux': reduxSrc } }
  // Compile Redux from source
  module.exports.module.loaders.push({
    test: /\.js$/,
    loaders: [ 'babel' ],
    include: reduxSrc
  })
}
*/
