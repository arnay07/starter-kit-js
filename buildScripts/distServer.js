import express from "express";
import path from "path";
import open from "open";
import compression from 'compression';

/* eslint-disable no-console */

/*we choose a port for our server*/
const port = 3000;

/*create instance of express*/
const app = express();

/* this is not for actual prod it is for debugging purposes */

app.use(compression());
app.use(express.static('dist'));

app.get('/users', (req, res) => {
  res.json([
    {"id":1, "firstName":"toto", "lastName":"bobo", "email":"ok@gmail.com"},
    {"id":2, "firstName":"coco", "lastName":"lolo", "email":"ok2@gmail.com"},
  ]);
});

/* tell express which routes it should handle */
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  }
  else {
    open("http://localhost:" + port);
  }
});
