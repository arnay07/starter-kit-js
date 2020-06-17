import express from "express";
import path from "path";
import open from "open";

/*we choose a port for our server*/
const port = 3000;

/*create instance of express*/
const app = express();

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
