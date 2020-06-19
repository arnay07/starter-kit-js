import path from 'path';
import webpack from 'webpack';

export default {
  debug: true,
  devtool: 'source-map',
  /*gives us info of the bundling*/
  noInfo: false,
  entry: [
    path.resolve(__dirname, 'dist')
  ],
  /*we are targeting the web it can be node or electron*/
  target: 'web',

  /*tells where it should create our dev bundle;
  it won't generate files in the memory, we are calling
  our bundle bundle.js*/
  output: {
    path: path.resolve(__dirname, 'src'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    //Eliminate duplicate packages when generating bundle
    new webpack.optimize.DedupePlugin(),
    //minify js
    new webpack.optimize.UglifyJsPlugin()
  ],
  module: {
    /*what files to handle, webpack can handle css*/
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
      {test: /\.css$/, loaders: ['style','css']}
    ]
  }
}
