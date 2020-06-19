import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';



export default {
  debug: true,
  devtool: 'inline-source-map',
  /*gives us info of the bundling*/
  noInfo: false,
  entry: [
    path.resolve(__dirname, 'src/index')
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
    //Create the html file that includes reference to bundle.js
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: true
    })
  ],
  module: {
    /*what files to handle, webpack can handle css*/
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
      {test: /\.css$/, loaders: ['style','css']}
    ]
  }
}
