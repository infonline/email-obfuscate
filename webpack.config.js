const path = require('path');
const webpack = require('webpack');

const TARGET = process.env.npm_lifecycle_event;
const config = {
  library: 'EmailObfuscate',
  filename: 'emailObfuscate',
  example: 'index',
  bundle: 'bundle'
};
const paths = {
  SRC: path.resolve(__dirname, './src'),
  EXAMPLE: path.resolve(__dirname, './example'),
  BUILD: path.resolve(__dirname, './lib')
};

let webpackBase = {
  entry: path.join(paths.SRC, '/', config.filename, '.js'),
  output: {
    path: paths.EXAMPLE,
    filename: `${config.bundle}.js`
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        include: [paths.SRC, paths.EXAMPLE],
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: [paths.SRC, paths.EXAMPLE],
        loader: 'eslint-loader'
      }
    ]
  }
};

if (TARGET === 'start' || !TARGET) {
  module.exports = Object.assign(webpackBase, {
    entry: [
      `${paths.EXAMPLE}/${config.example}.js`
    ],
    devtool: 'source-map',
    devServer: {
      contentBase: paths.EXAMPLE,
      inline: true,
      progress: true,
      port: '8080'
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development')
      })
    ]
  });
}

if (TARGET === 'build-example') {
  module.exports = Object.assign(webpackBase, {
    entry: `${paths.EXAMPLE}/${config.example}.js`,
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      })
    ],
    optimization: {
      minimize: true
    }
  });
}

if (TARGET === 'build-lib') {
  module.exports = Object.assign(webpackBase, {
    entry: `${paths.SRC}/${config.filename}.js`,
    output: {
      path: paths.BUILD,
      libraryTarget: 'umd',
      library: config.library,
      filename: config.filename + '.js'
    },
    module: {
      rules: [{
        test: /\.js?$/,
        loader: 'babel-loader',
        include: [paths.SRC],
        exclude: /node_modules/
      }]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      })
    ],
    optimization: {
      minimize: true
    }
  });
}
