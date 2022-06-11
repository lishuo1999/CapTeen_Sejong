var createError=require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
const cors = require('cors');
const dotenv=require('dotenv').config('/etc/');
var app = express();

var routes = require('./routes/index');


//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors({
    origin: true,
    credentials: true
}));
app.use(cookieParser());
app.use(
    session({
        key: "loginData",
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: {
            path:'/',
            httpOnly: true,
            secure: false,
            maxAge: 60*60*1000, // 1 hour-should be corrected after
        },
    })
);

//port configuration
//const PORT = 3000;

// allowing which folder can be serviced to users
app.use(express.static(path.join(__dirname,'/public/htmls')));
app.use('/', routes);

//catch 404 and forward to error handler
app.use(function(req,res,next) {
    next(createError(404));
})

//error handler
app.use(function(err, req, res, next){
    //set locals, only providing error in development
    res.locals.message=err.message;
    res.locals.error=req.app.get('env')==='development' ? err : {};

    //render the error page
    res.status(err.status || 500);
    res.render('error');
})

//starting servers
// app.listen(PORT, () =>{
//     console.log(`Listen : ${PORT}`);
// });


module.exports = app;