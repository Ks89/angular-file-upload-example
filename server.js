let express = require("express");
let bodyParser = require("body-parser");

let path  = require('path');
let http  = require('http');
let multer  = require('multer');
let upload = multer({ dest: 'uploads/' });

let app = express();

app.use('/', express.static(path.join(__dirname, 'dist/')));

// parse application/x-www-form-urlencoded
// for easier testing with Postman or plain HTML forms
app.use(bodyParser.urlencoded({extended: true}));
// parse application/json
app.use(bodyParser.json());

app.use(function (err, req, res, next) {
  res.status(500).send({
    status: 500,
    message: 'internal server error'
  });
});

app.get("/", function(req, res) {
  res.json({message: "Express is up!"});
  // res.status(200).success();
});

app.post('/api/nomultipart', function (req, res, next) {
    let data = new Buffer('');
    req.on('data', function(chunk) {
      data = Buffer.concat([data, chunk]);
    });
    req.on('end', function() {
      console.log('data', data);
    });
    res.status(200).send({});
});


app.post('/api/multipartformdata', upload.single('file'), function (req, res, next) {
  // req.file is the file
  // req.body will hold the text fields, if there were any

  console.log(req.file);
  console.log(req.body);

  // to get the file you have to read it from file system using fs.readFileSync
  // filename and full path is available in req object
  // you can read that file using a Buffer

  res.status(200).send({});

});

app.listen(3000, function() {
  console.log("Express running");
});
