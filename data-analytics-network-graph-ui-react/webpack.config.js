const path = require('path');
const webpack = require('webpack');
var ReplacePlugin = require('replace-bundle-webpack-plugin');

let artifactId = "network-graphs-visualization-portlet";

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'bundle.min.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'var',
    library: ['reactComponents', artifactId],
    publicPath: '__network_graphs_visualization_portlet_public_path__'
  },

  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader"
      }
    },

    {
      test: /\.(ttf|eot|svg|gif|woff2|woff|png)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      use: [{
        loader: 'file-loader'
      }]
    },
    {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
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
      partten: /"__network_graphs_visualization_portlet_public_path__"/g,
      replacement: function () {
        return 'window.staticFileBaseUrl';
      }
    }]),
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     'NODE_ENV': JSON.stringify("production")
    //   }
    // }),
  ]

}