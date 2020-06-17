import express from "express";
import path from "path";
import open from "open";
import webpack from "webpack";
import config from "../webpack.config.dev";


/* eslint-disable no-console */

/*we choose a port for our server*/
const port = 3000;

/*create instance of express*/
const app = express();

/* we then pass pass the value of the webpack config to a variable*/
const compiler = webpack(config);

app.use(require("webpack-dev-middleware") (compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.get('/users', (req, res) => {
  res.json([
    {"id":1, "firstName":"toto", "lastName":"bobo", "email":"ok@gmail.com"},
    {"id":2, "firstName":"coco", "lastName":"lolo", "email":"ok2@gmail.com"},
  ]);
});

/* tell express which routes it should handle */
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, "../src/index.html"));
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  }
  else {
    open("http://localhost:" + port);
  }
});
