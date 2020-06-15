import path from 'path';
import HtmlWebpackplugin from 'html-webpack-plugin'
import WebpackMd5Hash from 'webpack-md5-hash'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

export default {
  mode: "production",
  devtool: 'source-map',
  entry: {
    vendor: path.resolve(__dirname, 'src/vendor'),
    main: path.resolve(__dirname, 'src/index')
  },
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].[chunkhash].js'
  },
  optimization: {
    splitChunks: {
      // include all types of chunks
      chunks: 'all'
    }
  },
  plugins: [
    // Generate an external ccs file wiht a hash in the file name
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    // has the files using MD5 so that their names change when content changes
    new WebpackMd5Hash(),
    //create HTML file that includes reference to bundled JS
    new HtmlWebpackplugin({
      template: 'src/index.html',
      inject: true,
      //properties defined here are available in index.html
      // using htmlWebpackPLugin.options.varName
      //trackJSToken: '',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeStyleLinkTrypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    })
  ],
  module: {
    rules: [
      { test: /\.js$/, 
        exclude: /node_modules/, 
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
      }},
      { 
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      }
    ]
  }
}
