// console.log('cb+ is calling...');
// ------------ Import all node modules ------------ //

// ------------ @ core node modules ------------ //
var express = require('express');
var http = require('http');
var mysql = require('mysql');
var app = express();
var bodyParser = require('body-parser');

// = Parse all form data 
app.use(bodyParser.urlencoded({extended:true}));

// ------------ @ used formating dates ------------ //
var dateFormat = require('dateformat');
var now = new Date();

// = This is view engine
// = Template parsing 
// = We are using ejs type
app.set('view engine', 'ejs');  


// ------------ @ import all related javascipt and css files to inject in our app ------------ //
app.use('/js',express.static(__dirname+'/node_modules/bootstrap/dist/js'));
app.use('/js',express.static(__dirname+'/node_modules/tether/dist/js'));
app.use('/js',express.static(__dirname+'/node_modules/jquery/dist'));
app.use('/css',express.static(__dirname+'/node_modules/bootstrap/dist/css'));

// = Global site title and base url
const siteTitle = 'CRUD Application';
const baseURL = 'http://localhost:4000/'

// = When page is loaded
// = Default page is loaded and the data is being called from MySQL database
// = We also adding some JavaScripts and CSS styles
// = For all the dependancies - see the package.json file for more information

// = get the event list by id
app.get('/event/edit');

app.get('/',function(req,res){
    // res.render('pages/index',{
    //     siteTitle : siteTitle,
    //     pageTitle : "Event List",
    //     items  : ''
    // });
    // = get the event list
    con.query("SELECT * FROM user ORDER BY id DESC", function(err, result){
        // console.log(result);
        res.render('pages/index',{
            siteTitle : siteTitle,
            pageTitle : "Event List",
            items  : result
        });
    });
});

// = add new event
app.get('/event/add', function(req, res){
    console.log('I am here!');
    res.render('pages/add-event',{
        siteTitle : siteTitle,
        pageTitle : 'Add Event',
        items : ''
    });
});

// = This is a POST method to data and pre-populate to the firm
app.post('/event/add', function(req,res){
    // // console.log(name);
    // console.log('--------------');
    // console.log(req.body.name);
    // console.log('--------------');
    // // console.log(username);
    // console.log('--------------');
    // console.log(req.body.username);
    var query = "INSERT INTO `user` (name,username) values('"+req.body.name+"','"+req.body.username+"')";
    con.query(query, function(err,result){
        res.redirect(baseURL);
    });
}); 

// = edit event 
app.get('/event/edit/:id', function(req,res){
    // console.log(req.params.id);
    con.query("SELECT * FROM user WHERE id = '"+req.params.id+"'",function(err,result){
        res.render('pages/edit-event',{
            siteTitle : siteTitle,
            pageTitle : 'Edit : '+result[0].name,
            result : result
        });
        // console.log(result);
        // console.log(err);
    });
});

// = hande the edit form after submit
app.post('/event/edit/:id',function(req,res){
    var id = req.params.id;
    var name = req.body.name;
    var username = req.body.username;
    con.query("UPDATE user SET name = '"+name+"', username = '"+username+"' WHERE id = '"+id+"'", function(err,result){
        // console.log(err);
        // console.log(result);
        res.redirect(baseURL);
    });
});

// = Delete record
app.get('/event/delete/:id', function(req,res){
    var id = req.params.id;
    console.log('id: '+id);
    con.query("DELETE FROM user WHERE id = '"+id+"'", function(err,result){
        console.log(err);
        console.log(result);
        res.redirect(baseURL);
    });
    
});

// = connect to the server
const con = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'test'
});

// = connect to the server
var server = app.listen('4000',function(){
    console.log('Server started on PORT: 4000......');
    console.log(__dirname);
});
