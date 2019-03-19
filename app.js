var express = require("express"); 
var fileUpload = require("express-fileupload");
var bodyParser = require("body-parser");
var mysql = require("mysql");
var path = require("path");
var app = express();

const {getHomePage} = require('./routes/index');
const {addProductPage, addProduct, deleteProduct, editProduct, editProductPage} = require('./routes/product');

var port = 1377;

var db = mysql.createConnection({
  host: "192.168.10.4",
  user: "pradeep_dbuser",
  password: "sqlpass123",
  database: "pradeep_database13"
});

// connect to database
db.connect(function(err){
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;


// configure middleware

app.set('port', process.env.port || port); // set express to use this port
app.set('views',__dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json()); // parse from data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(fileUpload()); // configure fileupload


app.get('/', getHomePage);
app.get('/add', addProductPage);
app.get('/edit/:id', editProductPage);
app.get('/delete/:id', deleteProduct);
app.post('/add', addProduct);
app.post('/edit/:id', editProduct);

app.listen(port, function(){
  console.log('Server running on port: {port}');
});