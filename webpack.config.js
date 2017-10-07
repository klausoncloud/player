var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var nodeModules = {};

// note the path.resolve(__dirname, ...) part
// without it, eslint-import-resolver-webpack fails
// since eslint might be invoked with different cwd
fs.readdirSync(path.resolve(__dirname, 'node_modules'))
    .filter(x => ['.bin'].indexOf(x) === -1)
    .forEach(mod => { nodeModules[mod] = `commonjs ${mod}`; });

 module.exports = {
     entry: './src/app.js',
     output: {
         path: path.resolve(__dirname, 'bin'),
         filename: 'app.bundle.js',
     },
     externals: nodeModules,
     module: {
         loaders: [{
             test: /\.js$/,

             loader: 'babel-loader'
         }]
     }
 }