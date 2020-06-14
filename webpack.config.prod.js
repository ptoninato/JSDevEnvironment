import path from 'path';
import webpack from 'webpack';

export default {
  mode: "production",
  devtool: 'source-map',
  entry: [
    path.resolve(__dirname, 'src/index')
  ],
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    //Eliminate duplicate packages when generating bundle
    new webpack.optimize.DedupePlugin(),

    //minify JS
    new webpack.optimize.UglifyJsPlugin()
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
      { test: /\.css$/, use: ['style-loader', 'css-loader'] }
    ]
  }
}
