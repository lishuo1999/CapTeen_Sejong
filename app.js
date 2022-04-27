const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const routes = require('./routes');

//port configuration
const PORT = 3000;

//let requests wrote in json without any problem
app.use(express.json())


// allowing which folder can be serviced to users
// https://{serverIpAddress}/ request will be directed to indexRouter
app.use(express.static(__dirname+'public/htmls'));
app.use(bodyParser.urlencoded({extended:true}));

// by manipulating router/index.js you can control urls and apis
app.use('/', routes);

//starting server
app.listen(PORT, () =>{
    console.log(`Listen : ${PORT}`);
});


//module.exports = router;