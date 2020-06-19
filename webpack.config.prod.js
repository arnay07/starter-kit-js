import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
//to make sure cache busting works we need to change the bundle name each time we
//update it so we use webpack hash
import WebpackMd5Hash from 'webpack-md5-hash';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
  debug: true,
  devtool: 'source-map',
  /*gives us info of the bundling*/
  noInfo: false,
  entry: {
    vendor: path.resolve(__dirname, 'src/vendor'),
    main: path.resolve(__dirname, 'src/index')
  },
  /*we are targeting the web it can be node or electron*/
  target: 'web',

  /*tells where it should create our dev bundle;
  it won't generate files in the memory, we are calling
  our bundle bundle.js*/
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    //Now that we are generating multiple bundles we will use a placeholder inside []
    filename: '[name].[chunkhash].js'
  },
  plugins: [
    // generate an external css file with a hash in the filename
    new ExtractTextPlugin('[name].[contenthash].css'),

    new WebpackMd5Hash(),
    //Use commonChunkPlugin to create a separate bundle
    //of vendor libraries so that they're cached separatly
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'  //must be the same name as the one specified in entry
    }),
    //Create the html file that includes reference to bundle.js
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      inject: true,
      //properties you define here are available in index.html
      // using htmlWebpackPlugin.options.varName
      trackJSToken: "b7e90639f3194f9e96d1661028141245"
    }),
    //Eliminate duplicate packages when generating bundle
    new webpack.optimize.DedupePlugin(),
    //minify js
    new webpack.optimize.UglifyJsPlugin()
  ],
  module: {
    /*what files to handle, webpack can handle css*/
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
      //{test: /\.css$/, loaders: ['style','css']}
      {test: /\.css$/, loader: ExtractTextPlugin.extract('css?SourceMap')}
    ]
  }
}
