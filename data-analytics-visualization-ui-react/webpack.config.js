const path = require('path');
const webpack = require('webpack');
var ReplacePlugin = require('replace-bundle-webpack-plugin')

let artifactId = "data-analytics-visualization-ui";

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.min.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'var',
    library: ['reactComponents', artifactId],
    publicPath: '__data_analytics_visualization_public_path__'
  },


  module: {
    rules: [{
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(ttf|eot|svg|gif|woff2|woff|png)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [{
          loader: 'file-loader'
        }]
      }
    ],
  },

  // Enable importing JS files without specifying their's extenstion
  //
  // So we can write:
  // import MyComponent from './my-component';
  //
  // Instead of:
  // import MyComponent from './my-component.jsx';
  resolve: {
    extensions: ['.js', '.jsx'],
  },

  plugins: [
    new ReplacePlugin([{
      partten: /"__data_analytics_visualization_public_path__"/g,
      replacement: function () {
        return 'window.staticFileBaseUrl';
      }
    }])
  ]
}